import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  HelpCircle, 
  ExternalLink, 
  BookOpen, 
  Users, 
  Shield, 
  Settings,
  Search,
  User,
  FileText,
  Globe,
  Mail,
  Phone
} from "lucide-react";

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState<string>("general");

  const faqData = {
    general: [
      {
        question: "O que é o ORCID?",
        answer: "ORCID (Open Researcher and Contributor ID) é um identificador digital único e persistente que distingue você de todos os outros pesquisadores. É uma organização sem fins lucrativos que fornece uma infraestrutura de pesquisa confiável para conectar pesquisadores e suas contribuições."
      },
      {
        question: "Por que preciso de um ORCID iD?",
        answer: "Um ORCID iD ajuda a garantir que suas publicações, financiamentos e outras contribuições sejam corretamente atribuídas a você, evitando confusão com pesquisadores que tenham nomes similares. É amplamente aceito por editores, financiadores e instituições de pesquisa."
      },
      {
        question: "O ORCID iD é gratuito?",
        answer: "Sim! Obter e manter um ORCID iD é completamente gratuito para pesquisadores individuais. O ORCID é financiado por organizações membros que se beneficiam da infraestrutura de identificação de pesquisadores."
      },
      {
        question: "Como posso criar meu ORCID iD?",
        answer: "Você pode criar seu ORCID iD visitando orcid.org e clicando em 'Register for an ORCID iD'. O processo é simples e leva apenas alguns minutos. Você precisará fornecer informações básicas como nome, email e afiliação."
      }
    ],
    platform: [
      {
        question: "Como funciona esta plataforma?",
        answer: "Esta plataforma é uma interface personalizada para gerenciar e visualizar dados do ORCID. Ela permite conectar seu ORCID iD, visualizar suas publicações, métricas de citação, e gerenciar suas informações profissionais de forma mais intuitiva."
      },
      {
        question: "Preciso estar logado para usar a plataforma?",
        answer: "Algumas funcionalidades básicas estão disponíveis sem login, mas para acessar seus dados pessoais, métricas de citação e funcionalidades avançadas, você precisa fazer login com seu ORCID iD."
      },
      {
        question: "Como posso conectar meu ORCID iD à plataforma?",
        answer: "Clique no botão 'Sign in' no canto superior direito e selecione 'ORCID'. Você será redirecionado para o site do ORCID para autorizar o acesso. Após a autorização, você será redirecionado de volta à plataforma."
      },
      {
        question: "Minhas informações estão seguras?",
        answer: "Sim! A plataforma segue as melhores práticas de segurança e só acessa as informações que você autoriza. Suas credenciais do ORCID nunca são armazenadas na plataforma - apenas um token de acesso temporário é usado."
      }
    ],
    citations: [
      {
        question: "Como são calculadas as métricas de citação?",
        answer: "As métricas de citação são calculadas usando dados do CrossRef, que é a principal fonte de informações sobre citações acadêmicas. O sistema analisa suas publicações com DOI e busca as citações correspondentes."
      },
      {
        question: "Por que algumas publicações não aparecem nas métricas?",
        answer: "Publicações sem DOI ou que não estão indexadas no CrossRef podem não aparecer nas métricas. Certifique-se de que suas publicações tenham DOIs válidos e estejam corretamente listadas no seu perfil ORCID."
      },
      {
        question: "Com que frequência são atualizadas as métricas?",
        answer: "As métricas são atualizadas em tempo real quando você solicita uma análise. Os dados do CrossRef são atualizados regularmente, então as informações mais recentes estarão disponíveis."
      },
      {
        question: "O que é o h-index aproximado?",
        answer: "O h-index aproximado é uma estimativa baseada nas suas publicações e citações disponíveis. É calculado usando a mesma metodologia do h-index tradicional, mas pode variar ligeiramente devido à cobertura dos dados."
      }
    ],
    technical: [
      {
        question: "Quais navegadores são suportados?",
        answer: "A plataforma é compatível com todos os navegadores modernos, incluindo Chrome, Firefox, Safari, Edge e outros navegadores baseados em Chromium. Recomendamos usar a versão mais recente do seu navegador."
      },
      {
        question: "A plataforma funciona em dispositivos móveis?",
        answer: "Sim! A plataforma é totalmente responsiva e funciona bem em smartphones e tablets. Todas as funcionalidades principais estão disponíveis em dispositivos móveis."
      },
      {
        question: "Como posso exportar meus dados?",
        answer: "Atualmente, os dados são exibidos na plataforma. Para exportar dados completos do seu perfil ORCID, você pode visitar diretamente orcid.org e usar as opções de exportação disponíveis lá."
      },
      {
        question: "O que fazer se encontrar um erro?",
        answer: "Se você encontrar algum erro, tente atualizar a página primeiro. Se o problema persistir, verifique sua conexão com a internet e se está logado corretamente. Para problemas persistentes, entre em contato conosco."
      }
    ]
  };

  const categories = [
    { id: "general", name: "Geral", icon: <HelpCircle className="h-5 w-5" /> },
    { id: "platform", name: "Plataforma", icon: <Settings className="h-5 w-5" /> },
    { id: "citations", name: "Citações", icon: <FileText className="h-5 w-5" /> },
    { id: "technical", name: "Técnico", icon: <Search className="h-5 w-5" /> },
  ];

  const usefulLinks = [
    {
      title: "Documentação Oficial do ORCID",
      description: "Guia completo sobre como usar o ORCID",
      url: "https://info.orcid.org/documentation/",
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      title: "FAQ Oficial do ORCID",
      description: "Perguntas frequentes oficiais",
      url: "https://info.orcid.org/researcher-faq/",
      icon: <HelpCircle className="h-5 w-5" />
    },
    {
      title: "Tutoriais em Vídeo",
      description: "Vídeos explicativos sobre o ORCID",
      url: "https://info.orcid.org/video-tutorials/",
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Política de Privacidade",
      description: "Como seus dados são protegidos",
      url: "https://orcid.org/privacy-policy",
      icon: <Shield className="h-5 w-5" />
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <HelpCircle className="h-12 w-12 text-orcid-green" />
                <h1 className="text-4xl font-bold text-gray-900">Perguntas Frequentes</h1>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Encontre respostas para as dúvidas mais comuns sobre o ORCID e nossa plataforma. 
                Se não encontrar o que procura, entre em contato conosco.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Categorias</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={activeCategory === category.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {category.icon}
                        <span className="ml-2">{category.name}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content - FAQ */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {categories.find(c => c.id === activeCategory)?.icon}
                    <span>{categories.find(c => c.id === activeCategory)?.name}</span>
                  </CardTitle>
                  <CardDescription>
                    Perguntas frequentes sobre {categories.find(c => c.id === activeCategory)?.name.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqData[activeCategory as keyof typeof faqData]?.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Useful Links */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ExternalLink className="h-5 w-5" />
                    <span>Links Úteis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {usefulLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 rounded-lg border border-gray-200 hover:border-orcid-green hover:bg-orcid-green/5 transition-all duration-200"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="text-orcid-green mt-0.5">
                            {link.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm">
                              {link.title}
                            </h4>
                            <p className="text-gray-600 text-xs mt-1">
                              {link.description}
                            </p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ; 