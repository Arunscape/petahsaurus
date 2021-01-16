(in-package :petahsaurus.api)

(setf (ningle:route *app* "/api/finding/:id")
      (lambda (params)
        (json 200 (db:get-finding (param params :id)) t)))

(setf (ningle:route *app* "/api/finding" :method :POST)
      (lambda (params)
        (json 200 `((id . ,(db:create-finding (param params "content")
                                              (param (param params "coords") "lat")
                                              (param (param params "coords") "long")))))))

(setf (ningle:route *app* "/api/findings/all")
      (lambda (params)
        (declare (ignore params))
        (json 200 (db:get-all-findings))))
