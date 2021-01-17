(defpackage :petahsaurus.token
  (:nicknames :tok)
  (:use :cl)
  (:export
   #:get-from-token
   #:is-partially-valid
   #:is-valid
   #:create-token))

(in-package :petahsaurus.token)

(defvar *key* (ironclad:ascii-string-to-byte-array "secret"))

(defun get-from-token (token value)
  (let ((tok (jose:decode :hs256 *key* token)))
    (cdr (assoc value tok :test #'string=))))

(defun is-partially-valid (token)
  (handler-case
    (let* ((tok (jose:decode :hs256 *key* token))
           (id (cdr (assoc "sub" tok :test #'string=)))
           (email (cdr (assoc "email" tok :test #'string=)))
           (isfull (cdr (assoc "isfull" tok :test #'string=)))
           (exp (cdr (assoc "exp" tok :test #'string=))))
        (if (< (util:get-unix-time) exp)
          (values id email isfull)
          nil))
    (jose/errors:jws-verification-error ()
      nil)
    (jose/errors:jws-invalid-format ()
      nil)))

(defun is-valid (token)
  (and
    (is-partially-valid token)
    (get-from-token token "isfull")
    (get-from-token token "sub")))

(defun create-token (id email isfull)
  (jose:encode :hs256 *key* (list (cons "email" email)
                                  (cons "sub" id)
                                  (cons "isfull" isfull)
                                  (cons "exp" (+ (util:get-unix-time)
                                                 (if isfull (* 60 60 24 7) (* 60 15)))))))
