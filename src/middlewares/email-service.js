const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// and easy to do anywhere, even with Node.js
exports.send = async (to, subject, pass) => {
    const msg = {
        to: to, // Change to your recipient
        from: 'bruno.franco.017@ufrn.edu.br', // Change to your verified sender
        subject: subject,
        html: `<p>Olá anunciante, você solicitou alteração de senha a sua nova senha é </p> <strong>${pass}</strong>`,
    }

    try {
        console.log("email uuuuuuuu");
        await sgMail.send(msg);

    } catch (error) {
        console.error(error);

        if (error.response) {
            console.error(error.response.body)
        }
    }
}