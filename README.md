# Online_Course

## Loyihaning maqsadi: 🎯
Course qoyihs va uni organish

## Funksional talablar: 
- Foydalanuvchi royxatan otishi kerak.
- Foydalanuvchi accaunt kira olishi kerak.
- Foydalanuvchi accaunt ochira olishi kerak.
- Foydalanuvchi accaunt tikla olishi kerak.
- Ustoz royxatan otishi kerak.
- Ustoz accaunt kira olishi kerak.
- Ustoz accaunt ochira olishi kerak.
- Ustoz accaunt tikla olishi kerak.
- Foydalanuvchi curs kora olishi va uni saqla olishi kerak.
- Foydalanuvchi saqlangan cursni ochira olishi kerak olishi kerak.
- Ustoz curs kora olishi va qosha olishi kerak.
- Ustoz curs ochira olishi kerak olishi kerak.

## Nofunksional talablar
- Tezlik
- Xavfsizlik
- Kengaya oladigan 

## Database models: 

1. Foydalanuvchi:
    - id
    - name
    - email (UNIQUE)
    - password
    - role
    - imageUrl
    - likes
    - token
2. Ustoz:
    - id
    - name
    - email
    - password (UNIQUE)
    - tel_number (UNIQUE)
    - imageUrl
    - role
    - courses
    - token
4. Course:
    - id
    - teacher_id
    - video or img
    - title
    - content
    - link or number_tel
5. Likes:
    - id
    - course_id
    - user_id

/->    Home page
/login    -> Login
/register  -> Register
/update  -> update
/forgot -> Forgot password
/delete -> delete account
/profile -> user and teacher
/profile/likes  -> User likes
/profile/courses -> Teacher courses
?query -> reset like curs