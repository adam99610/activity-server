const User = require('./User');
const Activity = require('./Activity');

User.hasMany(Activity);
Activity.belongsTo(User);

module.exports = { User, Activity };
