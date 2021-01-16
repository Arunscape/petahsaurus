(defpackage :petahsaurus.db
  (:nicknames :db)
  (:use :cl)
  (:export
   #:*connection*
   ))

(defvar *connection*
  (dbi:connect :sqlite3
               :database-name "petahsaurus.db"))
