
exports.up = function(knex, Promise) {
    return knex.schema.createTable('games', games => {
        games.increments();
        games.string('title', 255).notNullable().unique();
        games.string('genre', 255).notNullable();
        games.string('releaseYear', 255);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('games');
};