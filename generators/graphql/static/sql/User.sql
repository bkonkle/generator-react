-- mutation getCurrentUser
CREATE OR REPLACE FUNCTION get_current_user()
  RETURNS "user"
  AS $$
    INSERT INTO "user" (username) VALUES (current_setting('jwt.claims.sub'))
    ON CONFLICT (username) DO UPDATE SET username = current_setting('jwt.claims.sub')
    RETURNING *;
  $$
  LANGUAGE sql VOLATILE;

COMMENT ON FUNCTION get_current_user IS E'Get or create a user based on the logged-in JWT claims.';
