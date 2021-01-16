(defpackage :petahsaurus.util
  (:nicknames :util)
  (:use :cl)
  (:export
   #:>json
   #:<json
   #:json-200
   #:param
   #:starts-with
   #:make-id))

(in-package :petahsaurus.util)

(defun >json (json)
  (json:encode-json-to-string json))

(defun json-200 (json)
  `(200
    (:content-type "application/json")
    (,(>json json))))

(defun param (params name)
  (cdr (assoc name params :test #'equal)))

(defun starts-with (str start)
  (and (>= (length str) (length start))
       (string= start (subseq str 0 (length start)))))

(defun make-id ()
  (random (1- (expt 2 61))))
