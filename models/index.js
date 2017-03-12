import Committee from './committee';
import Event from './event';
import Headcount from './headcount';
import Membership from './membership';
import Mentor from './mentor';
import Officer from './officer';
import Quote from './quote';
import Shift from './shift';
import Specialty from './specialty';
import Tag from './tag';
import User from './user';

export default function() {

  Committee.hasOne(Officer);
  Committee.hasMany(Event);
  Committee.hasMany(Membership);

  Event.belongsTo(Committee);

  Headcount.belongsTo(User);

  Membership.belongsTo(Committee);
  Membership.belongsTo(User);

  Mentor.belongsTo(User);
  Mentor.hasMany(Shift);
  Mentor.belongsToMany(Specialty, { through: 'mentors_specialties' });

  Officer.belongsTo(User);
  Officer.belongsTo(Committee);

  Quote.belongsToMany(Tag, { through: 'quotes_tags' });

  Shift.belongsTo(Mentor);

  Specialty.belongsToMany(Mentor, { through: 'mentors_specialties' });
  Specialty.addScope('active', date => ({ include: [{ model: Mentor.scope({ method: ['active', date] }), required: true }] }));

  Tag.belongsToMany(Quote, { through: 'quotes_tags' });
  Tag.addScope('active', active => ({ include: [{ model: Quote, required: active }] }));

  User.hasMany(Headcount);
  User.hasMany(Membership);
  User.hasMany(Mentor);
  User.hasMany(Officer);
}
