const formatter = new Intl.NumberFormat('ru', {
  style: 'unit',
  unit:'kilometer-per-second', // value | value-per-value
  unitDisplay: 'long' // short-км/c | long-километров в секунду
})

const commentFormat = new Intl.NumberFormat('ru', {
  style: 'unit',
  unit:'kilometer', // value | value-per-value
  unitDisplay: 'long' // short-км/c | long-километров в секунду
})

{formatter.format(100)} //километров в секунду
{formatter.format(101)} //километр в секунду
{formatter.format(102)} //километра в секунду
{formatter.format(105)} //километров в секунду
{formatter.format(108)} //километров в секунду
{formatter.format(111)} //километров в секунду

//acre,bit,byte,ceisius,centimeter,day,degree,fahrepheit,fluid-ounce,foot,gallon
//gigabit,gigabyte,gram,hectare,hour,inch,kilobit,kilobyte,kilogram,kilometer,leter,
//megabit,meter,mile,mouth,percent,petabyte,year,yard,week,terabyte,stone,second,

const formatterRub = new Intl.NumberFormat('ru', {
  style: 'currency',
  currency:'RUB',
  maximumFractionDigits: 0,
  notation: "standard"
})

{formatterRub.format(150)} //150 P

export {formatterRub,formatter}
// https://metanit.com/web/javascript/18.4.php