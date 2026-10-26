const users = [
  ["riya_travels", "riya@example.com", "Riya Sharma", "Chasing sunsets 🌅", false, "2026-01-03T09:00:00.000Z"],
  ["arjun_clicks", "arjun@example.com", "Arjun Mehta", "Street photographer 📸", false, "2026-01-07T10:30:00.000Z"],
  ["meera.eats", "meera@example.com", "Meera Iyer", "Food first, always", true, "2026-01-12T08:15:00.000Z"],
  ["kabir_sings", "kabir@example.com", "Kabir Khan", null, false, "2026-01-18T19:45:00.000Z"],
  ["ananya_reads", "ananya@example.com", "Ananya Rao", "Books & chai", true, "2026-01-25T07:20:00.000Z"],
  ["rohan_runs", "rohan@example.com", "Rohan Desai", "Marathoner in training", false, "2026-02-02T06:00:00.000Z"],
  ["sara_sketches", "sara@example.com", "Sara Thomas", null, false, "2026-02-09T14:10:00.000Z"],
  ["vikram.trek", "vikram@example.com", "Vikram Singh", "Mountains > beaches", false, "2026-02-15T11:00:00.000Z"],
  ["neha_designs", "neha@example.com", "Neha Kapoor", "UI/UX designer", true, "2026-02-21T16:30:00.000Z"],
  ["aditya_codes", "aditya@example.com", "Aditya Verma", "I write bugs for a living", false, "2026-03-01T22:05:00.000Z"],
  ["isha_dances", "isha@example.com", "Isha Patel", null, false, "2026-03-08T12:40:00.000Z"],
  ["dev_shoots", "dev@example.com", "Dev Malhotra", "Wildlife photography", true, "2026-03-15T09:00:00.000Z"],
].map(([username, email, fullname, bio, isPrivate, createdAt]) => ({
  username, email, fullname, bio, isPrivate, createdAt: new Date(createdAt),
}));

const posts = [
  ["riya_travels", "insta01", "Sunset at Baga beach 🌅", "Goa", "2026-02-01T18:30:00.000Z"],
  ["arjun_clicks", "insta02", "Cutting chai at the station", "Mumbai", "2026-02-04T08:10:00.000Z"],
  ["vikram.trek", "insta03", "Snow everywhere ❄️", "Manali", "2026-02-08T10:00:00.000Z"],
  ["riya_travels", "insta04", "Pink city vibes", "Jaipur", "2026-02-12T13:25:00.000Z"],
  ["arjun_clicks", "insta05", null, "Pune", "2026-02-15T07:45:00.000Z"],
  ["arjun_clicks", "insta06", "Marine Drive at night", "Mumbai", "2026-02-19T21:00:00.000Z"],
  ["rohan_runs", "insta07", "Morning run done ✅", null, "2026-02-23T06:30:00.000Z"],
  ["riya_travels", "insta08", "Lake Pichola sunset", "Udaipur", "2026-02-27T17:50:00.000Z"],
  ["arjun_clicks", "insta09", "Shaniwar Wada on a Sunday", "Pune", "2026-03-03T11:15:00.000Z"],
  ["meera.eats", "insta10", "Fish thali > everything", "Goa", "2026-03-07T13:40:00.000Z"],
  ["vikram.trek", "insta11", "Trek to Hampta Pass begins", "Manali", "2026-03-11T05:20:00.000Z"],
  ["sara_sketches", "insta12", "New sketchbook, who dis", null, "2026-03-15T15:05:00.000Z"],
  ["riya_travels", "insta13", "Hawa Mahal at sunrise", "Jaipur", "2026-03-19T06:10:00.000Z"],
  ["meera.eats", "insta14", "Vada pav hunt 🍔", "Mumbai", "2026-03-23T19:30:00.000Z"],
  ["ananya_reads", "insta15", "Rainy day + chai + book", "Pune", "2026-03-27T16:20:00.000Z"],
  ["riya_travels", "insta16", "Old Goa churches", "goa", "2026-03-31T10:50:00.000Z"],
  ["vikram.trek", "insta17", "Solang valley paragliding 🪂", "Manali", "2026-04-04T12:00:00.000Z"],
  ["dev_shoots", "insta18", null, null, "2026-04-08T09:35:00.000Z"],
  ["riya_travels", "insta19", "City Palace details", "Udaipur", "2026-04-12T14:45:00.000Z"],
  ["rohan_runs", "insta20", "Sunset from Sinhagad fort", "Pune", "2026-04-16T18:15:00.000Z"],
  ["kabir_sings", "insta21", "Gateway of India, finally", "Mumbai", "2026-04-20T08:55:00.000Z"],
  ["isha_dances", "insta22", "Dance practice behind the scenes", null, "2026-04-24T20:25:00.000Z"],
  ["riya_travels", "insta23", "Palolem beach mornings", "Goa", "2026-04-28T07:05:00.000Z"],
  ["dev_shoots", "insta24", "Tiger spotted at Tadoba 🐅", "Chandrapur", "2026-05-02T06:40:00.000Z"],
].map(([author, key, caption, location, createdAt]) => ({
  author, key, imageUrl: `https://picsum.photos/seed/${key}/600/600`,
  caption, location, createdAt: new Date(createdAt),
}));

const likes = [
  ["meera.eats", "insta01"], ["vikram.trek", "insta01"], ["arjun_clicks", "insta01"],
  ["isha_dances", "insta01"], ["neha_designs", "insta01"], ["riya_travels", "insta03"],
  ["rohan_runs", "insta03"], ["arjun_clicks", "insta08"], ["kabir_sings", "insta08"],
  ["meera.eats", "insta08"], ["riya_travels", "insta10"], ["ananya_reads", "insta10"],
  ["kabir_sings", "insta10"], ["dev_shoots", "insta13"], ["arjun_clicks", "insta14"],
  ["meera.eats", "insta15"], ["neha_designs", "insta15"], ["aditya_codes", "insta15"],
  ["rohan_runs", "insta17"], ["isha_dances", "insta17"], ["vikram.trek", "insta20"],
  ["riya_travels", "insta20"], ["neha_designs", "insta22"], ["riya_travels", "insta24"],
  ["aditya_codes", "insta24"], ["vikram.trek", "insta24"], ["arjun_clicks", "insta24"],
  ["sara_sketches", "insta24"], ["rohan_runs", "insta24"],
].map(([user, post]) => ({ user, post }));

module.exports = { users, posts, likes };
