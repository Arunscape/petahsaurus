(defpackage :petahsaurus.util
  (:nicknames :util)
  (:use :cl)
  (:export
   #:>json
   #:<json
   #:return-404
   #:json
   #:param
   #:starts-with
   #:make-id))

(in-package :petahsaurus.util)

(defun >json (json)
  (json:encode-json-to-string json))

(defun return-404 ()
  `(404
    (:content-type "application/json")
    ("\"Not Found.\"")))

(defun json (status json &optional null-404)
  (if (and (null json) (null null-404))
      (return-404)
      `(,status
        (:content-type "application/json")
        (,(>json json)))))

(defun param (params name)
  (cdr (assoc name params :test #'equal)))

(defun starts-with (str start)
  (and (>= (length str) (length start))
       (string= start (subseq str 0 (length start)))))

(defun make-id ()
  (random (1- (expt 2 61))))
