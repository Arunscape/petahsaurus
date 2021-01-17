(in-package :petahsaurus.api)

(setf (ningle:route *app* "/api/finding/:id")
      (lambda (params)
        (let ((finding (db:get-finding (param params :id))))
          (json 200 (when finding
                      (cons `(tags . ,(db:get-tags (param params :id))) finding))
                t))))

(setf (ningle:route *app* "/api/finding/:id" :method :PUT)
      (lambda (params)
        (json 200 `((id . ,(db:update-finding (param params :id)
                                              (tok:get-from-token (param params "tok") "sub")
                                              (param params "content")
                                              (param params "image")
                                              (param params "date")
                                              (param (param params "coords") "lat")
                                              (param (param params "coords") "long")))))))

(setf (ningle:route *app* "/api/finding/:id/tags" :method :POST)
      (lambda (params)
        (if (db:get-finding (param params :id))
            (progn
              (db:set-tag (param params :id) (param params "key") (param params "value"))
              (no-content))
            (return-404))))

(setf (ningle:route *app* "/api/finding" :method :POST)
      (lambda (params)
        (json 200 `((id . ,(db:create-finding (tok:get-from-token (param params "tok") "sub")
                                              (param params "content")
                                              (param params "image")
                                              (param params "date")
                                              (param (param params "coords") "lat")
                                              (param (param params "coords") "long")))))))

(setf (ningle:route *app* "/api/findings/all" :method '(:POST :GET))
      (lambda (params)
        (let* ((has-tags-str (param params "tags"))
               (has-tags (if (stringp has-tags-str) (<json has-tags-str) has-tags-str)))
          (json 200
                (if has-tags
                    (db:get-all-findings-with-tags)
                    (db:get-all-findings))))))
