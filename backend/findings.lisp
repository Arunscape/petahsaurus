(in-package :petahsaurus.api)

(setf (ningle:route *app* "/api/finding/:id")
      (lambda (params)
        (declare (ignore params))
        (json-200 `((name . ,(param params :id))))))
