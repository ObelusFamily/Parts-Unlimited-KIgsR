const mongoose = require("mongoose");
mongoose.connect('localhost:27017');

const UserModel = require('./models/User')
const ItemModel = require('./models/Item')
const CommentModel = require('./models/Comment')

async function seed() {
    for (let i=0; i<100; i++) {
        const rand = Math.floor(Math.random() * 10000);
        const username = 'user' + rand;
        const user = await UserModel.create({
            username,
            email: `${username}@example.com`,
            bio: `hello world: ${username}`,
            image: `https://placekitten.com/200/300?${rand}`,
            role: 'user',
            favorites: [],
            following: []
        });

        const itemSlug = `Item-${username}`;
        const item = await ItemModel.create({
            slug: itemSlug,
            title: itemSlug.replace('-',' '),
            description: `${itemSlug} Description`,
            image: `https://www.fillmurray.com/640/360?${rand}`,
            favoritesCount: 0,
            comments: [],
            tagList: [],
            seller: user.id
        });

        CommentModel.create({
            body: `Good item ${itemSlug} - ${username}`,
            seller: user.id,
            item: item.id
        })
    }
}

seed();