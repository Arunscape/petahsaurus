(in-package :petahsaurus.api)

(setf (ningle:route *app* "/api/finding/:id")
      (lambda (params)
        (let ((finding (db:get-finding (param params :id))))
          (json 200 (when finding
                      (cons `(tags . ,(db:get-tags (param params :id))) finding))
                t))))


(setf (ningle:route *app* "/api/finding/:id/tags" :method :POST)
      (lambda (params)
        (if (db:get-finding (param params :id))
            (progn
              (db:set-tag (param params :id) (param params "key") (param params "value"))
              (no-content))
            (return-404))))

(setf (ningle:route *app* "/api/finding" :method :POST)
      (lambda (params)
        (json 200 `((id . ,(db:create-finding (param params "content")
                                              (param (param params "coords") "lat")
                                              (param (param params "coords") "long")))))))

(setf (ningle:route *app* "/api/findings/all")
      (lambda (params)
        (declare (ignore params))
        (json 200 (db:get-all-findings))))
