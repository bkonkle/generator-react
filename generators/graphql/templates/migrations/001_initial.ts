/* tslint:disable await-promise */
import Knex from 'knex'

import {schema, updateTimestamp} from '../src/utils/MigrationUtils'

export async function up (knex: Knex) {
  const getColumns = schema(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

  // timestamp updates
  await knex.raw(`
    CREATE OR REPLACE FUNCTION set_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = CURRENT_TIMESTAMP;
      RETURN NEW;
    END;
    $$ language 'plpgsql';
  `)

  // ignore the migration tables
  await knex.raw(`COMMENT ON TABLE knex_migrations is E'@omit';`)
  await knex.raw(`COMMENT ON TABLE knex_migrations_lock is E'@omit';`)

  // access roles
  await knex.raw(`ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM public;`)
  await knex.raw('DROP ROLE IF EXISTS <%= name %>_user;')
  await knex.raw('CREATE ROLE <%= name %>_user;')
  await knex.raw(`GRANT USAGE ON SCHEMA public TO <%= name %>_user;`)
  await knex.raw (`GRANT <%= name %>_user TO <%= name %>_root`)

  // user
  await knex.schema.createTable('user', table => {
    const columns = getColumns(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    // fields
    table.string('username')
      .unique()
      .notNullable()
      .comment(`The User''s login id - usually their email address.`)

    table.boolean('is_active')
      .comment(`If false, the User is suspended.`)
      .defaultTo(true)
  })

  await updateTimestamp(knex, 'user')

  await knex.raw(`GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE "user" TO <%= name %>_user;`)
  await knex.raw(`ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;`)

  await knex.raw(`
    CREATE POLICY user_same_user_policy ON "user"
      USING (username = current_setting('jwt.claims.sub'))
      WITH CHECK (username = current_setting('jwt.claims.sub'));
  `)

  // address
  await knex.schema.createTable('address', table => {
    const columns = getColumns(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    // fields
    table.string('line1').comment('The first line of the Address.')

    table.string('line2').comment('The second line of the Address.')

    table.string('city').comment('The city.')

    table.string('state').comment('The state or province.')

    table.string('country').comment('The country.')

    table.string('postal_code').comment('The zip or other postal code.')

    table.specificType('location', 'POINT')
      .comment('The latitude and longitude of the Address.')
  })

  await updateTimestamp(knex, 'address')

  await knex.raw(`GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE "address" TO <%= name %>_user;`)

  // account_types
  await knex.raw(`
    create type account_types as enum (
      'ACCOUNT_TYPE_PARENT_GUARDIAN',
      'ACCOUNT_TYPE_CAREGIVER'
    );
  `)

  // service_types
  await knex.raw(`
    create type service_types as enum (
      'SERVICE_TYPE_CHILDCARE',
      'SERVICE_TYPE_TUTORING'
    );
  `)

  // account
  await knex.schema.createTable('account', table => {
    const columns = getColumns(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    // fields
    table.specificType('account_type', 'account_types')
      .notNullable()
      .comment('The Account type. Required.')

    table.specificType('service_type', 'service_types')
      .comment('The desired Service type.')

    table.jsonb('attributes')
      .comment('Free-form Account attributes controlled by the front end.')

    // relationships
    columns
      .foreignUuid('user', {column: 'id', table: 'user'}, true)
      .comment('The User that created the Profile.')

    columns
      .foreignUuid('address', {column: 'id', table: 'address'})
      .comment(`The Account''s current Address.`)
  })

  await updateTimestamp(knex, 'account')

  await knex.raw(`GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE "account" TO <%= name %>_user;`)
  await knex.raw(`ALTER TABLE "account" ENABLE ROW LEVEL SECURITY;`)

  await knex.raw(`
    CREATE POLICY account_same_user_policy ON "account"
      USING (
        (
          SELECT true AS bool FROM (
            SELECT id FROM "user" u
            WHERE u.username = current_setting('jwt.claims.sub')
          ) AS user_using
        ) = true
      )
      WITH CHECK (
        "account".user IN (
          SELECT id FROM "user" u
          WHERE u.username = current_setting('jwt.claims.sub')
        )
      );
  `)
}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
