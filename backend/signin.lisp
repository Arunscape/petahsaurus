(in-package :petahsaurus.api)

(defun create-token-from-db (email)
  (let* ((usr (db:get-user-by-email email))
         (vid (assoc 'id usr))
         (id (and vid (cdr vid)))
         (vvalidate (assoc 'validation usr))
         (validate (and vvalidate (cdr vvalidate)))
         (isfull (string= validate "COMPLETE")))
    (tok:create-token id email isfull)))

(defun gen-tmp-token (email)
  (let ((value (create-token-from-db email)))
    `(200
      (:set-cookie ,(concatenate 'string "jwt=" value "; HttpOnly"))
      ("\":)\""))))

(setf (ningle:route *app* "/api/checkemail" :method :post)
      (lambda (params)
        (if (db:has-user-email (param params "email"))
          (json 200 `((exists . t)))
          (json 400 `((exists . false)))))) ; todo make this not a string

(setf (ningle:route *app* "/api/signup" :method :post)
      (lambda (params)
        (let ((email (param params "email"))
              (username (param params "username")))
          (db:create-user username email)
          (gen-tmp-token email))))

