(defpackage :petahsaurus.token
  (:nicknames :tok)
  (:use :cl :util)
  (:export
   #:*connection*
   #:create-finding
   #:get-finding
   #:get-all-findings
   #:get-user-by-email))

(defvar *key* (ironclad:ascii-string-to-byte-array "secret"))

(defun get-from-token (token value)
  (let ((tok (jose:decode :hs256 *key* token)))
    (cdr (assoc value tok :test #'string=))))

(defun is-valid (token)
  (handler-case
    (let* ((tok (jose:decode :hs256 *key* token))
           (id (cdr (assoc "sub" tok :test #'string=)))
           (email (cdr (assoc "email" tok :test #'string=)))
           (isfull (cdr (assoc "isfull" tok :test #'string=))))
        (values id email isfull))
    (jose/errors:jws-verification-error ()
      nil)
    (jose/errors:jws-invalid-format ()
      nil)))


(defun create-token (id email isfull)
  (jose:encode :hs256 *key* (list (cons "email" email)
                                  (cons "sub" id)
                                  (cons "isfull" isfull)
                                  (cons "exp" (+ (util:get-unix-time)
                                                 (if isfull (* 60 60 24 7) (* 60 15)))))))
