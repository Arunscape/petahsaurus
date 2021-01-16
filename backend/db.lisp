(defpackage :petahsaurus.db
  (:nicknames :db)
  (:use :cl)
  (:export
   #:*connection*
   #:create-finding
   #:get-finding
   #:get-all-findings
   #:get-user-by-email))


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
  (dbi:prepare *connection*
               "SELECT id, email FROM users WHERE email=?"))

;; database public api
(defun get-finding (id)
  (let ((row (dbi:fetch (dbi:execute +get-finding-sql+ (list id)))))
    (when row
      `((id . ,(getf row :|id|))
        (content . ,(getf row :|words|))
        (date . ,(getf row :|findingdate|))
        (coords . ((lat . ,(getf row :|lat|))
                   (long . ,(getf row :|long|))))))))

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

(defun query-helper (query result-formatter)
  (apply #'vector
         (loop for row = (dbi:fetch query)
               while row
               collect (funcall result-formatter row))))

(defun get-user-by-email (email)
  (let* ((query (dbi:execute +get-user-by-email-sql+ (list email)))
         (res (query-helper query (lambda (row)
                                   `((id . ,(getf row :|id|))
                                     (email . ,(getf row :|email|))))))
         (has-email (= 1 (length res))))
    has-email))
