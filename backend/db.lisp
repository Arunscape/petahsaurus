(defpackage :petahsaurus.db
  (:nicknames :db)
  (:use :cl)
  (:export
   #:*connection*
   #:create-finding
   #:get-finding
   #:get-all-findings
   ))

(in-package :petahsaurus.db)

(defvar *connection*
  (dbi:connect :sqlite3
               :database-name "petahsaurus.db"))

;; prepared statements
(defvar +create-finding-sql+
  (dbi:prepare *connection*
               "INSERT INTO findings (id, words, findingdate, lat, long) VALUES (?, ?, 'now', ?, ?)"))

(defvar +get-finding-sql+
  (dbi:prepare *connection*
               "SELECT id, words, findingdate, lat, long FROM findings WHERE id=?"))

(defvar +get-all-findings-sql+
  (dbi:prepare *connection*
               "SELECT id, words, findingdate, lat, long FROM findings"))


;; database public api

(defun create-finding (words lat long)
  (let ((id (util:make-id)))
    (dbi:execute +create-finding-sql+ (list id words lat long))
    id))

(defun finding-row-to-json (row)
  (when row
    `((id . ,(getf row :|id|))
      (content . ,(getf row :|words|))
      (date . ,(getf row :|findingdate|))
      (coords . ((lat . ,(getf row :|lat|))
                 (long . ,(getf row :|long|)))))))

(defun get-all-findings ()
  (let ((query (dbi:execute +get-all-findings-sql+)))
    (loop for row = (dbi:fetch query)
       while row
       collect (finding-row-to-json row))))
