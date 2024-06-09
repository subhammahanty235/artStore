const amqp = require("amqplib/callback_api")
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';
async function startConsumer() {
    console.log(RABBITMQ_URL)
    amqp.connect(RABBITMQ_URL, (error0, connection) => {
        if (error0) {
            console.log(error0)
            throw error0;

        }
        connection.createChannel(async (error1, channel) => {
            if (error1) {
                console.log(error1)
                throw error1
            }

            const exchange = "email_exchange";
            const queue = "email_queue";
            const routingKey = "send_email"

            await channel.assertExchange(
                exchange, "direct", {
                durable: false
            }
            )
            console.log("hereeeeeeeeeee")
            await channel.assertQueue(
                queue, {
                durable: false
            }
            )

            channel.bindQueue(queue, exchange, routingKey, {}, function (err) {
                if (err) {
                    console.error('Failed to bind queue:', err);
                    return;
                }

                console.log(`Queue ${queue} bound to exchange ${exchange} with routing key ${routingKey}`);

                channel.consume(queue, function (msg) {
                    console.log(msg)
                    if (msg.content) {
                        console.log(" [x] Received %s", msg.content.toString());
                    }
                }, {
                    noAck: true
                });
            });
        })
    })
}

module.exports = startConsumer;