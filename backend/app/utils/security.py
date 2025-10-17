from argon2 import PasswordHasher, exceptions

ph = PasswordHasher(
    time_cost=2,
    memory_cost=102400,  # Hashing memory 100 MB
    parallelism=8,
    hash_len=32,
    salt_len=16
)

def hash_password(plain_password: str) -> str:
    return ph.hash(plain_password)

def verify_password(stored_hash: str, candidate_password: str) -> bool:
    try:
        if ph.verify(stored_hash, candidate_password):
            if ph.check_needs_rehash(stored_hash):
                # optional: trigger background rehash job
                pass
            return True
    except exceptions.VerifyMismatchError:
        return False
    except exceptions.VerificationError:
        return False
    return False
