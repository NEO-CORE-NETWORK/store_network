from flask import Flask, render_template, request, redirect, url_for, flash, session

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'

# ฐานข้อมูลผู้ใช้แบบง่าย
users = {
    "admin": "1234",
}

# -----------------------------
# หน้า Login
# -----------------------------
@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        if username in users and users[username] == password:
            session['user'] = username
            return redirect(url_for('index'))
        else:
            flash('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
            return redirect(url_for('login'))

    return render_template('login.html')

# -----------------------------
# หน้า Index หลังล็อกอิน
# -----------------------------
@app.route('/index')
def index():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('index.html', user=session['user'])

# -----------------------------
# ออกจากระบบ
# -----------------------------
@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('login'))

# -----------------------------
# Main
# -----------------------------
if __name__ == '__main__':
    app.run(debug=True)
