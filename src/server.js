const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, Buttons, List, MessageMedia} = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.initialize();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('authenticated', (session) => {
    console.log('WHATSAPP WEB => Authenticated!');
});

client.on('ready', () => {
    console.log('WHATSAPP WEB => Client is ready!');
});

client.on('message', message => {
	if(message.body === '!ping') {
		message.reply('pong');
	}
});

client.on('message', message => {
	if(message.body === '!ping') {
		client.sendMessage(message.from, 'pong');
	}
});

client.on('message', msg => {
    console.log('mensaje de: ', msg.from, 'Texto: ', msg.body);
    if (msg.body === 'Hello') {
        let button = new Buttons('Button body',[{id:'customId',body:'button1'},{body:'button2'},{body:'button3'},{body:'button4'}], 'title', 'footer');
        console.log(button);
        client.sendMessage(msg.from, button);
    }
});
