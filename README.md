


<p align="left">
<a href="https://bruzelle.com" target="_blank">
<img src="https://i.imgur.com/DdvvNoo.png " width="50" alt="Celo Logo">
</a>
</p>

# Discord Bluzelle Bot




## **Motivation**

**[Bruzelle](https://bluzelle.com)** Bluzelle is a decentralized storage network for the creator economy.

This bot aims to use as an existing communication channel of one of the applications that many users use on a daily basis such as Discord. 

**Discord Bluzelle Bot** allows a user to create their account, check their balance and query the sentry testnet ((https://bluzelle.com)** Discord Channel.

# Use Cases 
##### UC1
> As a **user** I want to **use Discord** so that I can **create an account** on  Bluzelle.

##### UC2
> As a **user** I want to **use Discord** so that I can **check my balance**. 


##### UC3
> As a user I want to **use Discord** so that I can easely **query the Bluzelle Blockchain** with a **simple command**.






# Video 

https://youtu.be/nKfYYl3PEGQ




# SnapShots











| Command    | Bot Response 
| -------- | -------- | 
| *!balance*     | ![](https://i.imgur.com/hlcyTI9.png)   | 
|  *!create* (private message) |  ![](https://i.imgur.com/hhAh8or.png)    | 
|  *!create* (channel welcome ) | ![](https://i.imgur.com/HfTX4MZ.png)  | 
|   *!genesis* |  ![](https://i.imgur.com/Rnjg7hg.png)  |
|  !blockinfo|  ![](https://i.imgur.com/Lu6sABA.png) |  |
| *!status* | ![](https://i.imgur.com/QqAOJ4Z.png) |
| *!validators*| ![](https://i.imgur.com/WL46Xq2.png) |
| *!10minuteslease* Codes and Decodes the address and staking address for 10 minutes| ![](https://i.imgur.com/ZxPnI9p.png)| |





| !help| 
| -------- | 
| ![](https://i.imgur.com/ABSGWXT.png) |



# Build & Run 
```
npm install
npm run compile
```
```
npm run start
```


# Dependencies


```json=
 {
  "name": "bot",
  "version": "1.0.0",
  "description": "",
  "main": "bot.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "compile": "tsc",
    "start": "node bot.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@bluzelle/sdk-js": "^1.1.4",
    "discord.js": "^12.5.1",
    "dotenv": "^8.2.0",
    "fetch-json": "^2.4.9",
    "http": "0.0.1-security",
    "https": "^1.0.0",
    "tslib": "^2.2.0",
    "typescript": "^4.1.3",
    "web3": "^1.3.0"
  },
  "devDependencies": {
    "@types/node": "^14.14.22"
  }
}

```
<p align="center">
<a href="https://bruzelle.com" target="_blank">
<img src="https://i.imgur.com/DdvvNoo.png " width="150" alt="Celo Logo">
</a>
</p>




## Contact

Discord @aleadorjan

## Example code
```typescript=
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
```


## Read Reference


**About Bruzelle**
Bluzelle is a decentralized data network for dapps to manage data in a secure, tamper-proof, and highly scalable manner.

> Gitcoin PR

https://gitcoin.co/issue/bluzelle/Gitcoin10Hack/7/100025962


**Challenge Description**

Bluzelle provides decentralized data services, powered by the Cosmos blockchain. Our services include a key-value-store (CRUD), oracle, and NFT. We are also building toward providing support to EVM (Ethereum Virtual Machine) and Polkadot support for our services. Our bounties reflect our aggressive approach to consistently improve our ecosystem and value proposition.

While the Hackathon has a specific start and end date, we are ok with work continuing after the hackathon, for the chosen winners to finish their projects to our standards.

A bot that is able to push updates to the Bluzelle Discord channel, reporting relevant statistics gathered from configured networks.

For example, it might report stats from our testnet and mainnet. Stats reported might include things like # of validators, # of blocks, block times, etc. Refer to BD for info on interesting stats to show.

We are leaving the list of what metrics/stats to report to the developer, but note there are obvious ones we expect, that you can see on our BigDipper and Monitor page for our network. Chances of winning do increase by providing a richer set of data being reported by the bot.

The bot should be configurable to set:

Which networks to monitor Which stats/metrics to report Frequency desire for reporting For each network, which Discord channels to report to Necessary credentials and config info to allow the bot to get the data and post the stats to Discord

The demo video should demonstrate a working bot to a test channel created by the developer, but should also walk through the full process of downloading the bot code, setting it up, and showing how it works. Our t


**Our Discord:**

https://discord.gg/yqBmzPxRZK

**Website:**

https://www.bluzelle.com

**JS library:**

https://www.npmjs.com/package/@bluzelle/sdk-js


