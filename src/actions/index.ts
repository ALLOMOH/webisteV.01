import {defineAction , ActionError} from 'astro:actions';
import { z } from 'astro/zod';
import {Resend } from 'resend';
import { render } from '@react-email/components';
import { ContactEmail } from '@/emails/ContactEmail';
import { AcknowledgmentEmail } from '@/emails/AcknowledgmentEmail';


const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {

    contact:defineAction(
        {
            accept:'form',
            input:z.object({
                name:z.string().min(2,'le nom doit contenir au moins 2 caractères'),
                email:z.string().email('Veuillez entrer une adresse e-mail valide'),
                subject:z.string().min(2,'le sujet doit contenir au moins 2 caractères'),
                message:z.string().min(10,'le message doit contenir au moins 10 caractères'),
                phome:z.string().optional(),
            }),
            handler: async({name,email,subject,message,}) => {
                try{
                    // Envoi de l'email de confirmation a l'utilisateur
                    const confirmationHtml = await render(AcknowledgmentEmail({
                        name,
                    }));

                    await resend.emails.send({
                        from: 'ITExperts4Africa <onboarding@resend.dev>', // Remplacez par votre domaine vérifié
                        to: email, // Remplacez par votre vraie adresse
                        subject: `[ITExperts4Africa] Nouveau message de contact de ${name}`,
                        html: confirmationHtml,
                        replyTo: email
                    });

                    const notificationHtml = await render(ContactEmail({
                        name,
                        email,
                        message,
                        submittedAt: new Date()
                    }));;


                    await resend.emails.send({
                        from: 'ITExperts4Africa <onboarding@resend.dev',
                        to : [ 'delivered@resend.dev'],
                        subject: `[ITExperts4Africa] Nouveau message de contact de ${name}`,
                        html: notificationHtml,
                        replyTo: email // Pour pouvoir répondre directement au client
                    });

                    return { 
                        success: true,
                        message: 'Votre message a été envoyé avec succès ! Nous vous recontacterons bientôt.'
                    };
                                                        }
                catch (error) {
                    throw new ActionError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: 'Une Erreur dest survenue lors de l\'envoi de votre message. Veuillez réessayer plus tard.',
                    })           
                }
            }
        }
    )
};