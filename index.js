const Discord = require("discord.js");
const mysql = require("mysql");
const config = require("./config.json");
const prefix = "!";

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.on("messageCreate", async function (message) {
	if (message.author.bot) {
		return;
	}
	if (!message.content.startsWith(prefix)) {
		return;
	}
	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(" ");
	const command = args.shift().toLowerCase();
	if (command === "assign") {
		const connection = mysql.createConnection({
			host: "mysql.ct8.pl",
			user: "m28252_margo",
			password: "I1udrg12",
			database: "m28252_margo",
		});
		connection.connect((err) => {
			if (err) {
				throw err;
			}
			console.log("Connected to the MySQL server.");
		});
		const sqlQuery = `SELECT * FROM user WHERE id = '${args[0]}'`;
		connection.query(sqlQuery, (err, result) => {
			if (err) {
				throw err;
			}
			if (!result.length) {
				const query = `INSERT INTO user(id,licenceDate) VALUES (${args[0]},'2022-09-25T10:35:36.282Z')`;
				connection.query(query, (err, result) => {
					if (err) {
						throw err;
					}
					message.reply("Dodano pomyślnie!");
					connection.end();
				});
			} else {
				message.reply("Konto o podanym id występuję w bazie!");
			}
		});
	} else if (command === "countmaps") {
		const connection = mysql.createConnection({
			host: "mysql.ct8.pl",
			user: "m28252_margo",
			password: "I1udrg12",
			database: "m28252_margo",
		});
		connection.connect((err) => {
			if (err) {
				throw err;
			}
			console.log("Connected to the MySQL server.");
		});
		const sqlQuery = `SELECT * FROM maps`;
		connection.query(sqlQuery, (err, result) => {
			if (err) {
				throw err;
			}
			message.reply(`Mapy w bazie: ${result.length}`);
		});
	}
});

client.login(config.BOT_TOKEN);