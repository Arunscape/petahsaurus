(defpackage :petahsaurus.db
  (:nicknames :db)
  (:use :cl)
  (:export
   #:*connection*
   #:create-finding
   #:update-finding
   #:get-finding
   #:get-all-findings
   #:get-all-findings-with-tags
   #:get-user-by-email
   #:get-tags
   #:set-tag
   #:has-user-email
   #:validate
   #:is-user-valid
   #:create-user
   #:request-validation))


(in-package :petahsaurus.db)

(defvar *connection*
  (dbi:connect :sqlite3
               :database-name "petahsaurus.db"))

;; prepared statements
(defparameter +create-finding-sql+
  (dbi:prepare *connection*
               "INSERT OR REPLACE INTO findings (id, userid, words, picture, findingdate, lat, long) VALUES (?, ?, ?, ?, ?, ?, ?)"))

(defparameter +get-finding-sql+
  (dbi:prepare *connection*
               "SELECT * FROM findings WHERE id=?"))

(defparameter +get-all-findings-sql+
  (dbi:prepare *connection*
               "SELECT * FROM findings"))

(defparameter +get-user-by-email-sql+
  (dbi:prepare *connection* "SELECT id, email, validation FROM users WHERE email=?"))

(defparameter +set-user-validation-sql+
  (dbi:prepare *connection*
               "UPDATE users SET validation=\"COMPLETE\" WHERE validation=?"))

(defparameter +add-validation-request-sql+
  (dbi:prepare *connection*
               "UPDATE users SET validation=? WHERE email=?"))

(defparameter +add-user-sql+
  (dbi:prepare *connection*
               "INSERT INTO users (username, email, id) VALUES (?, ?, ?)"))

(defparameter +get-tags-sql+
  (dbi:prepare *connection*
               "SELECT k, v FROM tags WHERE findingid=?"))

(defparameter +set-tag-sql+
  (dbi:prepare *connection*
               "INSERT OR REPLACE INTO tags (findingid, k, v) VALUES (?, ?, ?)"))

;; database public api
(defun finding-row-to-json (row)
  (when row
    `((id . ,(getf row :|id|))
      (content . ,(getf row :|words|))
      (image . ,(getf row :|picture|))
      (date . ,(getf row :|findingdate|))
      (userid . ,(getf row :|userid|))
      (coords . ((lat . ,(getf row :|lat|))
                 (long . ,(getf row :|long|)))))))

(defun get-finding (id)
  (finding-row-to-json (dbi:fetch (dbi:execute +get-finding-sql+ (list id)))))

(defun query-helper (query result-formatter)
  (apply #'vector
         (loop for row = (dbi:fetch query)
               while row
               collect (funcall result-formatter row))))

(defun create-finding (userid words picture time lat long)
  (let ((id (util:random-string 8)))
    (dbi:execute +create-finding-sql+ (list id userid words picture time lat long))
    id))

(defun update-finding (userid id words picture time lat long)
    (dbi:execute +create-finding-sql+ (list id userid words picture time lat long))
    id)

(defun finding-with-tags-row-to-json (row)
  (when row
    `((id . ,(getf row :|id|))
      (content . ,(getf row :|words|))
      (image . ,(getf row :|picture|))
      (date . ,(getf row :|findingdate|))
      (userid . ,(getf row :|userid|))
      (coords . ((lat . ,(getf row :|lat|))
                 (long . ,(getf row :|long|))))
      (tags . ,(get-tags (getf row :|id|))))))

(defun get-all-findings ()
  (let ((query (dbi:execute +get-all-findings-sql+)))
    (apply #'vector
           (loop for row = (dbi:fetch query)
                 while row
              collect (finding-row-to-json row)))))

(defun get-all-findings-with-tags ()
  (let ((query (dbi:execute +get-all-findings-sql+)))
    (apply #'vector
           (loop for row = (dbi:fetch query)
                 while row
              collect (finding-with-tags-row-to-json row)))))


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
                                   `((:id . ,(getf row :|id|))
                                     (:email . ,(getf row :|email|))
                                     (:validation . ,(getf row :|validation|))))))
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
  (dbi:execute +add-user-sql+ (list name email (util:random-string))))

(defun request-validation (email)
  (let ((validation (util:random-string)))
    (dbi:execute +add-validation-request-sql+ (list validation email))
    validation))
