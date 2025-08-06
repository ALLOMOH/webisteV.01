import React, { useState } from "react";
import TitleDescription from "@/components/react/UI/components/TitleDescript";
import { Alert, AlertDescription } from "@/components/ui/alert";
import GlowButton from "@/components/react/UI/components/GlowButton";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Users,
  BadgeHelp,
} from "lucide-react";


import {motion}  from 'framer-motion';

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { actions } from "astro:actions";
import DecryptedText from "./Text/DecryptedText";
import ShinyText from "./Text/ShinyText";
import LightCommunicationBackground from "./Animation/LightCommunicationBackground";

export default function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Validation côté client
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error("Tous les champs sont requis");
      }

      // Validation email côté client
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Veuillez saisir une adresse email valide");
      }

      console.log('Sending request to:', '/api/resend');
      console.log('Form data:', formData);

      // Appel à l'API Astro
      const response = await fetch('/api/resend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim()
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers.get('content-type'));

      // Vérifier si la réponse est du JSON
      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response:', textResponse.substring(0, 500));
        throw new Error('Le serveur a retourné une réponse inattendue. Vérifiez la configuration de l\'API.');
      }

      const result = await response.json();
      console.log('API Response:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi du message');
      }

      if (result.success) {
        setIsSubmitted(true);
        // Réinitialiser le formulaire après un court délai pour laisser voir le message de succès
        setTimeout(() => {
          setFormData({ name: "", email: "", message: "" });
        }, 100);
      } else {
        throw new Error(result.error || 'Erreur inconnue');
      }
      
    } catch (err: any) {
      console.error('Erreur lors de l\'envoi:', err);
      
      // Messages d'erreur personnalisés
      if (err.message?.includes("Failed to fetch")) {
        setError("Problème de connexion. Vérifiez votre connexion internet et réessayez.");
      } else if (err.message?.includes("not logged in")) {
        setError("Vous devez être connecté pour envoyer un message. Veuillez vous connecter et réessayer.");
      } else if (err.name === 'SyntaxError' && err.message?.includes('JSON')) {
        setError("Erreur de configuration du serveur. Contactez l'administrateur.");
      } else {
        setError(err.message || "Erreur lors de l'envoi du message. Veuillez réessayer ou nous contacter directement par téléphone.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour réinitialiser le formulaire
  const resetForm = () => {
    setIsSubmitted(false);
    setError("");
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      value: "+225 01 23 45 67 89",
      description: "Appelez-nous pour un conseil immédiat",
      color: "text-blue-600 bg-blue-100",
    },
    {
      icon: Mail,
      title: "Email",
      value: "contact@itexperts4africa.com",
      description: "Écrivez-nous, nous répondons sous 24h",
      color: "text-green-600 bg-green-100",
    },
    {
      icon: MapPin,
      title: "Adresse",
      value: "Abidjan, Cocody, II Plateaux",
      description: "Côte d'Ivoire",
      color: "text-orange-600 bg-orange-100",
    },
    {
      icon: Clock,
      title: "Horaires",
      value: "Lun - Ven : 8h30 - 18h00",
      description: "Support d'urgence 24/7",
      color: "text-purple-600 bg-purple-100",
    },
  ];

  const reasons = [
    {
      icon: MessageSquare,
      title: "Consultation gratuite",
      description: "Premier entretien sans engagement",
    },
    {
      icon: Users,
      title: "Équipe dédiée",
      description: "Un interlocuteur unique pour votre projet",
    },
    {
      icon: BadgeHelp,
      title: "Support réactif",
      description: "Réponse garantie sous 24h",
    },
  ];

  return (
    <div className="w-full text-white">
      {/* Hero Section */}
      <LightCommunicationBackground
        className="absolute inset-0 -z-10"
      
      >
        <section className="relative bg-gradient-to-br backdrop-blur-xs from-transparent via-black/50 to-it4a-primary/50 pt-50 p-10" >
          <div className="max-w-7xl text-center space-y-10 md:space-y-9 mx-auto px-6 md:px-4 lg:px-8">
        
                <motion.h1
                    className="text-4xs md:text-5xl font-bold  text-gray-100 mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
        
                  >
                    <DecryptedText
                      speed={20}
                      animateOn="view"
                      text="Contactez"
                    />
                    {' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-it4a-primary to-it4a-orange">
                        <DecryptedText
                          animateOn="view"
                          speed={10}
                          text="Nous"
                        />
                    </span>
                  </motion.h1>
                  <motion.p
                    className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                      <ShinyText
                        splitType="words"
                        text="Une question ? Un projet ? Parlons-en ! Notre équipe est là pour vous accompagner dans votre transformation numérique."
                      />
                  </motion.p>
            <div className="grid md:grid-cols-3 md:gap-8 gap-2 mb-16">
              {reasons.map((reason, index) => (
                <div key={index} className="text-center">
                  <div className="h-12 w-12 md:w-16 md:h-16 mx-auto md:mb-4 mb-2 bg-it4a-secondary rounded-full shadow-lg flex items-center justify-center">
                    <reason.icon className="text-it4a-primary h-6 w-6 md:h-8 md:w-8" />
                  </div>
                  <h3 className="text-xs md:text-lg font-Poppins mb-1 md:mb-2 text-transparent bg-clip-text bg-gradient-to-r from-it4a-primary to-it4a-orange">
                    {reason.title}
                  </h3>
                  <p className="text-xs text-gray-30">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </LightCommunicationBackground>

      {/* Contact Form & Info */}
      <section className="py-20 relative bg-gradient-to-b from-it4a-secondary to-it4a-primary/20 text-white">
        <div className="custom-shape-divider-top-1752494969">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <rect x="1200" height="3.6"></rect>
            <rect height="3.6"></rect>
            <path
              d="M0,0V3.6H580.08c11,0,19.92,5.09,19.92,13.2,0-8.14,8.88-13.2,19.92-13.2H1200V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <style>
          {`
            .custom-shape-divider-top-1752494969 {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              overflow: hidden;
              line-height: 0;
            }

            .custom-shape-divider-top-1752494969 svg {
              position: relative;
              display: block;
              width: calc(100% + 1.3px);
              height: 224px;
            }

            .custom-shape-divider-top-1752494969 .shape-fill {
              fill: #f1ca13;
            }
          `}
        </style>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
            {/* Contact Form */}
            <div>
              <div className="bg-white/10 relative border-none shadow-lg h-full">
                <div className="p-8">
                  <div className="text-2xs md:text-2xl font-bold mb-2">
                    Envoyez-nous un message
                  </div>
                  <p className="text-xs text-gray-100">
                    Remplissez le formulaire ci-dessous et nous vous
                    recontacterons rapidement.
                  </p>
                </div>
                <div className="p-8 pt-0">
                  {isSubmitted ? (
                    <div className="space-y-4">
                      <Alert className="border-green-200/60 bg-green-100/90 backdrop-blur-2xl">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                          Votre message a été transmis avec succès ! Nous vous recontacterons très bientôt.
                        </AlertDescription>
                      </Alert>
                      <GlowButton
                        variant="secondary"
                        onClick={resetForm}
                        className="w-full text-center justify-center text-white text-xs md:text-lg"
                      >
                        Envoyer un autre message
                      </GlowButton>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-4 md:space-y-6"
                      method="POST" action={actions.contact}
                    >
                      {error && (
                        <Alert variant="destructive">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-100 mb-2"
                        >
                          Nom complet *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Votre nom et prénom"
                          className="h-12"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-100 mb-2"
                        >
                          Adresse email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="votre.email@exemple.com"
                          className="h-12"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-100 mb-2"
                        >
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Décrivez votre projet ou votre besoin..."
                          rows={6}
                          className="resize-none md:min-h-24"
                          disabled={isSubmitting}
                        />
                      </div>

                      <GlowButton
                        variant="primary"
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-full gap-1.5 text-center justify-center text-white text-xs md:text-lg"
                      >
                        {isSubmitting ? (
                          "Envoi en cours..."
                        ) : (
                          <>
                            <Send className="h-4 md:h-full md:w-6" /> Envoyer le message
                          </>
                        )}
                      </GlowButton>

                      <div className="text-center">
                        <p className="text-sm text-gray-200">
                          Vous pouvez aussi nous contacter directement par
                          téléphone au{" "}
                          <span className="font-semibold text-it4a-primary">
                            +225 01 23 45 67 89
                          </span>
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-2 md:space-y-8">
              <div>
                <h2 className="text-3xs md:text-3xl font-bold text-white mb-2 md:mb-4">
                  Nos coordonnées
                </h2>
                <p className="text-xs md:text-lg text-gray-300 mb-2">
                  Plusieurs moyens de nous contacter selon votre préférence.
                  Nous sommes à votre écoute !
                </p>
              </div>

              <div className="grid gap-1 md:gap-3">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="bg-white/10 border-none shadow-xs hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-center space-x-2">
                        <div
                          className={`w-6 h-6 md:w-12 md:h-12 rounded-lg flex items-center justify-center ${info.color}`}
                        >
                          <info.icon className="md:h-6 md:w-6 h-3 w-3" />
                        </div>
                        <div className="flex flex-col flex-1 justify-center items-start">
                          <h3 className="text-xs md:text-lg font-Poppins text-gray-100 font-bold">
                            {info.title}
                          </h3>
                          <p className="text-gray-100 text-xs">
                            {info.value}
                          </p>
                          <p className="text-gray-100 text-xs md:text-sm">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="border-none bg-white/10 col-span-full shadow-lg">
              <div className="p-6">
                <h3 className="text-xs md:text-lg font-semibold text-gray-100 mb-4">
                  Notre localisation
                </h3>
                <div className="aspect-video bg-gray-10 rounded-lg flex items-center justify-center">
                  <iframe 
                    title="Google Maps Embed"
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248.26706606761965!2d-3.925372613786799!3d5.375270130575594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ed4993045de1%3A0x49ef2dc36306f103!2s110%20Rue%20S%C3%A9ville%2C%20Abidjan!5e0!3m2!1sfr!2sci!4v1753206772462!5m2!1sfr!2sci"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-10 md:py-20 bg-gradient-to-b from-white/30 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xs lg:text-4xl font-bold text-it4a-secondary mb-2 md:mb-6">
            Questions fréquentes
          </h2>
          <div className="grid md:grid-cols-2 gap-5 md:gap-8 mt-12">
            <div className="text-left space-y-2 md:space-y-4">
              <h3 className="text-2xs md:text-lg font-semibold text-it4a-secondary">
                Proposez-vous des devis gratuits ?
              </h3>
              <p className="text-gray-600">
                Oui, nous proposons des consultations et devis entièrement
                gratuits pour évaluer vos besoins et vous proposer la meilleure
                solution.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-2xs md:text-lg font-semibold text-it4a-secondary">
                Intervenez-vous dans toute l'Afrique ?
              </h3>
              <p className="text-gray-600">
                Basés en Côte d'Ivoire, nous intervenons dans plusieurs pays
                d'Afrique de l'Ouest et proposons des solutions à distance pour
                le reste du continent.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-2xs md:text-lg font-semibold text-it4a-secondary">
                Quel est votre délai d'intervention ?
              </h3>
              <p className="text-gray-600">
                Pour les urgences, nous intervenons sous 24h. Pour les projets
                planifiés, nous nous adaptons à vos contraintes et délais.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-2xs md:text-lg font-semibold text-it4a-secondary">
                Proposez-vous des contrats de maintenance ?
              </h3>
              <p className="text-gray-600">
                Oui, nous proposons différents contrats de maintenance adaptés à
                la taille et aux besoins de votre entreprise.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}