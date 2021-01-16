(in-package :petahsaurus.api)

(setf (ningle:route *app* "/api/checkemail")
      (lambda (params)
        (json 200)))
