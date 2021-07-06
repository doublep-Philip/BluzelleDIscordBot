require("dotenv").config();
import { Client, MessageEmbed, MessageAttachment } from "discord.js";
//https://www.npmjs.com/package/@bluzelle/sdk-js
/*
mint an account by visiting https://client.sentry.testnet.private.bluzelle.com:1317/mint, which will provide a mnemonic and an address. This may take a while.

check your balance at https://client.sentry.testnet.private.bluzelle.com:1317/bank/balances/{address}. If your account balance is 0, mint another account until a positive ubnt balance shows
*/
import { bluzelle } from "@bluzelle/sdk-js";
import { fetchJson } from "fetch-json";
const AUTHOR = "@aleadorjan";
const BOT_NAME = "Bruzelle Discord Bot";
const BOT_NAME_FOOTER = "Bruzelle";
const DAYS_LEASE = 0;
const DENOMINATION = "ubnt";
const EMBED_COLOR_PRIMARY = 0xc33aff;
const EMBED_COLOR_SECONDARY = 0xcc32ff;
const GAS_PRICE = 0.002;
const HOURS_LEASE = 0;
const LOGO = "https://i.imgur.com/DdvvNoo.png";
const LOGO_PINK = "https://i.imgur.com/nYvOkc6.png";
const LOGO_TURING = "https://i.imgur.com/bPvTfKL.png";
const LOGO_WHITE = "https://i.imgur.com/kR1el6X.png";
const MAX_GAS = 100000000;
const MINUTES_LEASE = 10;
const MSG_SEND = "Creating the account. See the private message ...";
const SECONDS_LEASE = 0;
const TIMEOUT_MSG = 2000;
const URL_BLOCK_INFO =
  "https://client.sentry.testnet.private.bluzelle.com:26657/abci_info?";
const URL_BLUZELLE = "https://bluzelle.com";
const URL_GENESIS =
  "https://client.sentry.testnet.private.bluzelle.com:26657/genesis?";
const URL_MINT = "https://client.sentry.testnet.private.bluzelle.com:1317/mint";
const URL_SENTRY = "https://client.sentry.testnet.private.bluzelle.com:26657";
const URL_STATUS =
  "https://client.sentry.testnet.private.bluzelle.com:26657/status?";
const URL_VALIDATORS =
  "https://client.sentry.testnet.private.bluzelle.com:26657/validators";
const YEARS_LEASE = 0;

const MNEMONIC = process.env.MNEMONIC;
let user_address = process.env.ADDRESS;
let actual_mnemonic = "";
const params = { user_default_mnemonic: MNEMONIC };
actual_mnemonic = params.user_default_mnemonic;
console.log(`Starting + ${BOT_NAME}`);
const client: Client = new Client();

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("message", async (msg) => {
  try {
    if (msg.content === "!balance") {
      const sdk = await bluzelle({
        mnemonic: MNEMONIC,
        url: URL_SENTRY,
        maxGas: MAX_GAS,
        gasPrice: GAS_PRICE,
      });
      let query = await sdk.bank.q.Balance({
        address: user_address + "",
        denom: DENOMINATION,
      });
      const exampleEmbed = new MessageEmbed()
        .setColor(EMBED_COLOR_PRIMARY)
        .setURL(URL_BLUZELLE)
        .setAuthor("author: " + AUTHOR, LOGO, URL_BLUZELLE)
        .setDescription(BOT_NAME)
        .setThumbnail(LOGO)
        .addFields({
          name: "Address",
          value: user_address,
          inline: true,
        })
        .addFields({
          name: "Balance",
          value: query.balance.amount,
          inline: true,
        })
        .setTimestamp()
        .setImage(LOGO_WHITE)
        .setFooter(BOT_NAME + BOT_NAME_FOOTER);
      msg.channel.send(exampleEmbed);
    }
    if (msg.content === "!create") {
      const data = await fetchJson.get(URL_MINT);
      actual_mnemonic = data.result.mnemonic;
      user_address = data.result.address;
      const sdk = await bluzelle({
        mnemonic: MNEMONIC,
        url: URL_SENTRY,
        maxGas: MAX_GAS,
        gasPrice: GAS_PRICE,
      });
      let query = await sdk.bank.q.Balance({
        address: user_address + "",
        denom: DENOMINATION,
      });
      try {
        const sentMessage = await msg.channel.send(MSG_SEND);
        await sentMessage.delete({ timeout: TIMEOUT_MSG });
        const welcomeEmbed = new MessageEmbed()
          .setColor(EMBED_COLOR_SECONDARY)
          .setURL(URL_BLUZELLE)
          .setAuthor("author: " + AUTHOR, LOGO, URL_BLUZELLE)
          .setDescription(BOT_NAME)
          .setThumbnail(LOGO)
          .addField("Welcome to Bruzelle ", user_address, true)
          .setTimestamp()
          .setImage(LOGO_WHITE)
          .setFooter(BOT_NAME + BOT_NAME_FOOTER);
        msg.channel.send(welcomeEmbed);
      } catch (error) {
        const errorEmbed = new MessageEmbed()
          .setColor(EMBED_COLOR_SECONDARY)
          .setURL(URL_BLUZELLE)
          .setAuthor("author: " + AUTHOR, LOGO, URL_BLUZELLE)
          .setDescription(BOT_NAME)
          .setThumbnail(LOGO)
          .setTimestamp()
          .setImage(LOGO_WHITE)
          .setFooter(BOT_NAME + BOT_NAME_FOOTER);
        msg.channel.send(errorEmbed);
      }
      msg.author.send("Your public address " + user_address);
      msg.author.send("Your mnemonic phrase (DO NOT SHARE) " + actual_mnemonic);
    }
    if (msg.content === "!genesis") {
      const data = await fetchJson.get(URL_GENESIS);
      let genesis_time = data.result.genesis.genesis_time;
      let genesis_chain_id = data.result.genesis.chain_id;
      let genesis_initial_height = data.result.genesis.initial_height;
      const genesisEmbed = new MessageEmbed()
        .setColor(EMBED_COLOR_PRIMARY)
        .setURL(URL_BLUZELLE)
        .setAuthor("author: " + AUTHOR, LOGO, URL_BLUZELLE)
        .setDescription(BOT_NAME)
        .setThumbnail(LOGO_TURING)
        .addField(" Genesis time ", genesis_time, true)
        .addField(" Genesis chain id ", genesis_chain_id, true)
        .addFields({
          name: "Initial height",
          value: genesis_initial_height,
          inline: true,
        })
        .setTimestamp()
        .setImage(LOGO_WHITE)
        .setFooter(BOT_NAME + BOT_NAME_FOOTER);
      msg.channel.send(genesisEmbed);
    }
    if (msg.content === "!blockinfo") {
      const data = await fetchJson.get(URL_BLOCK_INFO);
      let last_block_height = data.result.response.last_block_height;
      let data_info = data.result.response.data;
      let last_block_app_hash = data.result.response.last_block_app_hash;
      const blockEmbed = new MessageEmbed()
        .setColor(EMBED_COLOR_PRIMARY)
        .setURL(URL_BLUZELLE)
        .setAuthor("author: " + AUTHOR, LOGO, URL_BLUZELLE)
        .setDescription(BOT_NAME)
        .setThumbnail(LOGO)
        .addField(" Last Block Height", last_block_height, true)
        .addField(" Last Block App Hash", last_block_app_hash, true)
        .addFields({
          name: "Info ",
          value: data_info,
          inline: true,
        })
        .setTimestamp()
        .setImage(LOGO_WHITE)
        .setFooter(BOT_NAME + BOT_NAME_FOOTER);
      msg.channel.send(blockEmbed);
    }
    if (msg.content === "!status") {
      const data = await fetchJson.get(URL_STATUS);
      let latest_block_hash = data.result.sync_info.latest_block_hash;
      let latest_block_time = data.result.sync_info.latest_block_time;
      let validator_info = data.result.validator_info.address;
      const statusEmbed = new MessageEmbed()
        .setColor(EMBED_COLOR_PRIMARY)
        .setURL(URL_BLUZELLE)
        .setAuthor("author: " + AUTHOR, LOGO, URL_BLUZELLE)
        .setDescription(BOT_NAME)
        .setThumbnail(LOGO_PINK)
        .addFields(
          {
            name: "Latest Block Hash",
            value: latest_block_hash,
            inline: true,
          },
          {
            name: "Latest Block Time",
            value: latest_block_time,
            inline: true,
          },
          {
            name: "Validator Info",
            value: validator_info,
            inline: true,
          }
        )
        .setTimestamp()
        .setImage(LOGO_WHITE)
        .setFooter(BOT_NAME + BOT_NAME_FOOTER);
      msg.channel.send(statusEmbed);
    }
    if (msg.content === "!validators") {
      const data = await fetchJson.get(URL_VALIDATORS);

      let validator_block_height = data.result.block_height;
      let validator_total = data.result.total;

      const validatorEmbed = new MessageEmbed()
        .setColor(EMBED_COLOR_PRIMARY)
        .setURL(URL_BLUZELLE)
        .setAuthor("author: " + AUTHOR, LOGO, URL_BLUZELLE)
        .setDescription(BOT_NAME)
        .setThumbnail(LOGO_PINK)
        .addField(" Validator Block Height", validator_block_height, true)
        .addField(" Total ", validator_total, true)
        .addField(" address: ", data.result.validators[0].address, false)
        .addField(" address: ", data.result.validators[1].address, false)
        .addField(" address: ", data.result.validators[2].address, false)
        .addField(" address: ", data.result.validators[3].address, false)
        .addField(" address: ", data.result.validators[4].address, false)
        .setTimestamp()
        .setImage(LOGO_WHITE)
        .setFooter(BOT_NAME + BOT_NAME_FOOTER);
      msg.channel.send(validatorEmbed);
    }

    if (msg.content === "!10minuteslease") {
      const sdk = await bluzelle({
        mnemonic: actual_mnemonic + "",
        url: URL_SENTRY,
        maxGas: MAX_GAS,
        gasPrice: GAS_PRICE,
      });
      let uuid = Date.now().toString();
      let _key = user_address;
      let _value = sdk.staking.address;
      msg.channel.send(
        `Writing for ${MINUTES_LEASE} minutes your address and staking address`
      );
      await sdk.db.tx.Create({
        creator: sdk.db.address,
        uuid: uuid,
        key: _key,
        value: new TextEncoder().encode(_value),
        metadata: new Uint8Array(),
        lease: {
          days: DAYS_LEASE,
          seconds: SECONDS_LEASE,
          years: YEARS_LEASE,
          hours: HOURS_LEASE,
          minutes: MINUTES_LEASE,
        },
      });
      try {
        let read = await sdk.db.q.Read({
          uuid: uuid,
          key: _key,
        });
        let _decode = new TextDecoder().decode(read.value);

        const leaseEmbed = new MessageEmbed()
          .setColor(EMBED_COLOR_PRIMARY)
          .setURL(URL_BLUZELLE)
          .setThumbnail(LOGO)
          .setAuthor("author: " + AUTHOR, LOGO, URL_BLUZELLE)
          .setDescription(BOT_NAME)
          .addField(" Writing ", _key, true)
          .addFields({
            name: "Reading",
            value: _decode,
            inline: true,
          })
          .setTimestamp()
          .setImage(LOGO_WHITE)
          .setFooter(BOT_NAME + BOT_NAME_FOOTER);
        msg.channel.send(leaseEmbed);
      } catch (error) {
        msg.reply("error" + error);
        const attachment = new MessageAttachment(LOGO);
        msg.channel.send(attachment);
        console.log(new Date().toISOString(), "ERROR", error.stack || error);
      }
    }

    if (msg.content == "!help") {
      const helpEmbed = new MessageEmbed()
        .setColor(EMBED_COLOR_SECONDARY)
        .setThumbnail(LOGO)
        .setTitle(`Send a messege follow by !`)
        .addField("Account balance ", "!balance")
        .addField("Creating an account with mnemonic ", "!create")
        .addField("Genesis info ", "!genesis")
        .addField("Block info ", "!blockinfo")
        .addField("Blockchain status ", "!status")
        .addField("List of Validators ", "!validators")
        .addField("SDK Code and Decode example", "!10minuteslease")
        .setURL(URL_BLUZELLE)
        .setThumbnail(LOGO_TURING)
        .setFooter(BOT_NAME + BOT_NAME_FOOTER);
      msg.channel.send(helpEmbed);
    }
  } catch (error) {
    msg.reply("error" + error);
    const attachment = new MessageAttachment(LOGO);
    msg.channel.send(attachment);
    console.log(new Date().toISOString(), "ERROR", error.stack || error);
  }
});

client.login(process.env.DISCORD_TOKEN);