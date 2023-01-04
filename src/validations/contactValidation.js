import * as Yup from 'yup';

export const contactSchema=Yup.object().shape({
    fullname:Yup.string().required("نام و نام خانوادگی الزامی می باشد"),
    photo:Yup.string().url("آدرس معتبر نیست").required("تصویر مخاطب الزامی می باشد"),
    mobile:Yup.string().required("شماره همراه الزامی می باشد").min(11,'شماره همراه باید 11 رقم باشد').max(11,'شماره همراه باید 11 رقم باشد').matches(/^[0-9]+$/, "شماره همراه تنها باید عدد باشد"),
    email:Yup.string().email("ایمیل معتبر نمی باشد").required("آدرس ایمیل الزامی می باشد"),
    job:Yup.string().nullable(),
    group:Yup.string().required("انتخاب گروه الزامی می باشد")
})