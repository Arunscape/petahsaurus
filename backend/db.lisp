(defpackage :petahsaurus.db
  (:nicknames :db)
  (:use :cl)
  (:export
   #:*connection*
   #:create-finding
   #:get-finding
   #:get-all-findings
   #:get-user-by-email
   #:get-tags
   #:set-tag
   #:has-user-email
   #:validate
   #:is-user-valid
   #:create-user))


(in-package :petahsaurus.db)

(defvar *connection*
  (dbi:connect :sqlite3
               :database-name "petahsaurus.db"))

;; prepared statements
(defparameter +create-finding-sql+
  (dbi:prepare *connection*
               "INSERT INTO findings (id, words, findingdate, lat, long) VALUES (?, ?, 'now', ?, ?)"))

(defparameter +get-finding-sql+
  (dbi:prepare *connection*
               "SELECT id, words, findingdate, lat, long FROM findings WHERE id=?"))

(defparameter +get-all-findings-sql+
  (dbi:prepare *connection*
               "SELECT id, words, findingdate, lat, long FROM findings"))

(defparameter +get-user-by-email-sql+
  (dbi:prepare *connection* "SELECT id, email, validation FROM users WHERE email=?"))

(defparameter +get-user-by-validation-sql+
  (dbi:prepare *connection* "SELECT id FROM users WHERE validation=?"))

(defparameter +set-user-validation-sql+
  (dbi:prepare *connection*
               "UPDATE users SET validation=\"COMPLETE\" WHERE validation=?"))

(defparameter +add-user-sql+
  (dbi:prepare *connection*
               "INSERT INTO users (username, email) VALUES (?, ?)"))

(defparameter +get-tags-sql+
  (dbi:prepare *connection*
               "SELECT k, v FROM tags WHERE findingid=?"))

(defparameter +set-tag-sql+
  (dbi:prepare *connection*
               "INSERT OR REPLACE INTO tags (findingid, k, v) VALUES (?, ?, ?)"))

;; database public api
(defun get-finding (id)
  (let ((row (dbi:fetch (dbi:execute +get-finding-sql+ (list id)))))
    (when row
      `((id . ,(getf row :|id|))
        (content . ,(getf row :|words|))
        (date . ,(getf row :|findingdate|))
        (coords . ((lat . ,(getf row :|lat|))
                   (long . ,(getf row :|long|))))))))

(defun query-helper (query result-formatter)
  (apply #'vector
         (loop for row = (dbi:fetch query)
               while row
               collect (funcall result-formatter row))))

;; database public api
(defun create-finding (words lat long)
  (let ((id (util:make-id)))
    (dbi:execute +create-finding-sql+ (list id words lat long))
    (write-to-string id)))

(defun finding-row-to-json (row)
  (when row
    `((id . ,(write-to-string (getf row :|id|)))
      (content . ,(getf row :|words|))
      (date . ,(getf row :|findingdate|))
      (coords . ((lat . ,(getf row :|lat|))
                 (long . ,(getf row :|long|)))))))

(defun get-all-findings ()
  (let ((query (dbi:execute +get-all-findings-sql+)))
    (apply #'vector
           (loop for row = (dbi:fetch query)
                 while row
              collect (finding-row-to-json row)))))

(defun get-tags (id)
  (let ((query (dbi:execute +get-tags-sql+ (list id))))
    (loop for row = (dbi:fetch query)
       while row
       collect `(,(getf row :|k|) . ,(getf row :|v|)))))

(defun set-tag (id key value)
  (dbi:execute +set-tag-sql+ (list id key value)))


(defun get-user-by-email (email)
  (let* ((query (dbi:execute +get-user-by-email-sql+ (list email)))
         (res (query-helper query (lambda (row)
                                   `((id . ,(getf row :|id|))
                                     (email . ,(getf row :|email|))
                                     (validation . ,(getf row :|validation|))))))
         (has-email (= 1 (length res))))
    (and has-email (elt res 0))))

(defun has-user-email (email)
  (and (get-user-by-email email) t))

(defun validate (validation)
  (dbi:execute +set-user-validation-sql+ (list validation)))

(defun is-user-valid (email)
  (let ((v (assoc 'validation (get-user-by-email email))))
    (and v (cdr v))))

(defun create-user (name email)
  (dbi:execute +add-user-sql+ (list name email)))
