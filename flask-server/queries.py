import data_manager


def get_random_tricks(trick_id):
    return data_manager.execute_select("""
    SELECT name, description, difficulty, video FROM tricks
    WHERE id = %(trick_id)s
    """, {"trick_id": trick_id})


def get_max_id():
    return data_manager.execute_select("""
        SELECT id FROM tricks
        ORDER BY id DESC
        LIMIT 1
    """)


def get_trick_by_difficulty(diff):
    return data_manager.execute_select("""
        SELECT name, id FROM tricks
        WHERE difficulty = %(diff)s
    """, {"diff": diff})


def get_trick_by_id(trick_id):
    return data_manager.execute_select("""
    SELECT name, description, difficulty, video FROM tricks
    WHERE id = %(trick_id)s
    """, {"trick_id": trick_id})


def add_new_user(name, password, email):
    data_manager.execute_insert("""
    INSERT INTO users ( name, email, password) VALUES (%(name)s, %(email)s, %(password)s)
    """, {"name": name, "email": email, "password": password})


def check_email(email):
    return data_manager.execute_select("""
        SELECT EXISTS(SELECT email FROM users WHERE email = %(email)s) as email
    """, {"email": email}, fetchall=False)


def get_user_password(email):
    return data_manager.execute_select(
        """SELECT password FROM users WHERE email = %(email)s
        """, {"email": email}, fetchall=False)


def get_user_id(email):
    return data_manager.execute_select("""
        SELECT id FROM users WHERE email = %(email)s
        """, {"email": email}, fetchall=False)