(in-package :petahsaurus.api)

(setf (ningle:route *app* "/api/checkemail" :method :post)
      (lambda (params)
        (if (db:get-user-by-email (param params "email"))
          (json 200 `((exists . t)))
          (json 400 `((exists . false)))))) ; todo make this not a string
