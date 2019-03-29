import Knex, {CreateTableBuilder} from 'knex'

export const handlePrimaryUuid = (knex: Knex, table: CreateTableBuilder) => (column?: string) =>
  table
    .uuid(column || 'id')
    .primary()
    .notNullable()
    .unique()
    .defaultTo(knex.raw('uuid_generate_v4()'))

export const handleForeignUuid = (table: CreateTableBuilder) => (
  (column: string, reference: {column: string, table: string}, required?: boolean) => {
    const col = table.uuid(column)
    if (required) col.notNullable()
    table.foreign(column).references(reference.column).inTable(reference.table)

    return col
  }
)

export const schema = (knex: Knex) => {
  return (table: CreateTableBuilder) => {
    return {
      primaryUuid: handlePrimaryUuid(knex, table),
      foreignUuid: handleForeignUuid(table),
    }
  }
}

export async function updateTimestamp (knex: Knex, tableName: string) {
  return knex.raw(`
    CREATE TRIGGER set_${tableName}_updated_at
      BEFORE UPDATE ON "${tableName}"
      FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
  `)
}
