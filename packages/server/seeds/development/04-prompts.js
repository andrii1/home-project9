/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('prompts').del();
  await knex('prompts').insert([
    {
      id: '1',
      title: 'What makes a good Notion template for selling?',
      topic_id: '1',
    },
    {
      id: '2',
      title: 'How can I determine the target audience for my Notion template?',
      topic_id: '1',
    },
    {
      id: '3',
      title:
        'How do I choose the right pricing strategy for my Notion template?',
      topic_id: '1',
    },
    {
      id: '4',
      title:
        'What are the most important features to include in a Notion template for selling?',
      topic_id: '1',
    },
    {
      id: '5',
      title:
        'How can I make my Notion template stand out from others on the market?',
      topic_id: '1',
    },
    {
      id: '6',
      title: 'How do I promote my Notion template to potential customers?',
      topic_id: '1',
    },
    {
      id: '7',
      title:
        'What is the best way to showcase the benefits of my Notion template?',
      topic_id: '1',
    },
    {
      id: '8',
      title:
        'How can I gather feedback from customers to improve my Notion template?',
      topic_id: '1',
    },
    {
      id: '9',
      title:
        'What are some common objections customers might have about purchasing a Notion template?',
      topic_id: '1',
    },
    {
      id: '10',
      title:
        'How can I offer excellent customer support for my Notion template?',
      topic_id: '1',
    },
    {
      id: '11',
      title: 'How can I use social media to market my Notion template?',
      topic_id: '1',
    },
    {
      id: '12',
      title:
        'How can I upsell additional products or services to customers who have purchased my Notion template?',
      topic_id: '1',
    },
    {
      id: '13',
      title: 'How can I use email marketing to promote my Notion template?',
      topic_id: '1',
    },
    {
      id: '14',
      title:
        'What are some best practices for creating a sales page for my Notion template?',
      topic_id: '1',
    },
    {
      id: '15',
      title:
        'How can I use influencer marketing to promote my Notion template?',
      topic_id: '1',
    },
    {
      id: '16',
      title:
        'What are some common mistakes to avoid when selling a Notion template?',
      topic_id: '1',
    },
    {
      id: '17',
      title: 'What are some creative ways to market my Notion template?',
      topic_id: '1',
    },
    {
      id: '18',
      title: 'How can I use a landing page to promote my Notion template?',
      topic_id: '1',
    },
    {
      id: '19',
      title:
        'How can I use online advertising to drive sales of my Notion template?',
      topic_id: '1',
    },
    {
      id: '20',
      title: 'How can I use video marketing to promote my Notion template?',
      topic_id: '1',
    },
    {
      id: '21',
      title:
        'How can I create an attractive and user-friendly design for my Notion template?',
      topic_id: '1',
    },
    {
      id: '22',
      title:
        'What are the most important elements to include in a Notion template?',
      topic_id: '1',
    },
    {
      id: '23',
      title:
        'How do I ensure the functionality and efficiency of my Notion template?',
      topic_id: '1',
    },
    {
      id: '24',
      title:
        'How do I make my Notion template easy to use and customize for customers?',
      topic_id: '1',
    },
    {
      id: '25',
      title:
        'How can I make my Notion template scalable for different size businesses or individuals?',
      topic_id: '1',
    },
    {
      id: '26',
      title:
        'What are some advanced features I can include in my Notion template to make it stand out?',
      topic_id: '1',
    },
    {
      id: '27',
      title:
        'How do I test my Notion template before selling it to ensure it meets customer needs?',
      topic_id: '1',
    },
    {
      id: '28',
      title: 'How do I optimize my Notion template for mobile devices?',
      topic_id: '1',
    },
    {
      id: '29',
      title:
        'What are the best practices for organizing information in a Notion template?',
      topic_id: '1',
    },
    {
      id: '30',
      title:
        'How can I use automation to streamline processes in my Notion template?',
      topic_id: '1',
    },
    {
      id: '31',
      title:
        'What are some ways to make my Notion template visually appealing?',
      topic_id: '1',
    },
    {
      id: '32',
      title:
        'How do I ensure the security and privacy of customer data in my Notion template?',
      topic_id: '1',
    },
    {
      id: '33',
      title:
        'How can I make my Notion template accessible for users with disabilities?',
      topic_id: '1',
    },
    {
      id: '34',
      title:
        'What are the steps to take to prepare my Notion template for launch?',
      topic_id: '1',
    },
    {
      id: '35',
      title:
        'How can I use customer feedback to improve and update my Notion template over time?',
      topic_id: '1',
    },
    {
      id: '36',
      title:
        'How can I keep my Notion template up-to-date with the latest technology and features?',
      topic_id: '1',
    },
    {
      id: '37',
      title:
        'What are some creative ways to add value to my Notion template for customers?',
      topic_id: '1',
    },
    {
      id: '38',
      title:
        'How can I differentiate my Notion template from others on the market?',
      topic_id: '1',
    },
    {
      id: '39',
      title:
        'How can I provide helpful resources and tutorials to customers using my Notion template?',
      topic_id: '1',
    },
    {
      id: '40',
      title:
        'What are some common challenges I may encounter while building and selling my Notion template, and how can I overcome them?',
      topic_id: '1',
    },
    {
      id: '41',
      title:
        'How do I ensure the compatibility of my Notion template with other tools and systems?',
      topic_id: '1',
    },
    {
      id: '42',
      title:
        'How can I use data and analytics to inform the design and functionality of my Notion template?',
      topic_id: '1',
    },
    {
      id: '43',
      title:
        'How do I create a user-friendly interface for my Notion template?',
      topic_id: '1',
    },
    {
      id: '44',
      title:
        'How can I ensure that my Notion template is easy to set up and implement for customers?',
      topic_id: '1',
    },
    {
      id: '45',
      title:
        'What resources or tools can I use to improve the development and design process of my Notion template?',
      topic_id: '1',
    },
    {
      id: '46',
      title:
        'How can I use customer personas to guide the design and development of my Notion template?',
      topic_id: '1',
    },
    {
      id: '47',
      title:
        'How do I handle version control and updates for my Notion template?',
      topic_id: '1',
    },
    {
      id: '48',
      title:
        'What are the best practices for creating a user manual or guide for my Notion template?',
      topic_id: '1',
    },
    {
      id: '49',
      title:
        'How can I use design thinking principles to create a Notion template that truly meets customer needs?',
      topic_id: '1',
    },
    {
      id: '50',
      title:
        'How can I measure the success and effectiveness of my Notion template after it is launched and in use by customers?',
      topic_id: '1',
    },
    {
      id: '51',
      title:
        'How can I use Notion to create a project management system for my digital product?',
      topic_id: '2',
    },
    {
      id: '52',
      title:
        'How can I use Notion to create a knowledge base for my digital product?',
      topic_id: '2',
    },
    {
      id: '53',
      title:
        'How can I use Notion to create a customer relationship management system for my digital product?',
      topic_id: '2',
    },
    {
      id: '54',
      title:
        'How can I use Notion to create a content calendar for my digital product?',
      topic_id: '2',
    },
    {
      id: '55',
      title:
        'How can I use Notion to create a task management system for my digital product?',
      topic_id: '2',
    },
    {
      id: '56',
      title:
        'How can I use Notion to create a workflow automation system for my digital product?',
      topic_id: '2',
    },
    {
      id: '57',
      title:
        'How can I use Notion to create a budgeting and financial tracking system for my digital product?',
      topic_id: '2',
    },
    {
      id: '58',
      title:
        'How can I use Notion to create a team collaboration platform for my digital product?',
      topic_id: '2',
    },
    {
      id: '59',
      title:
        'How can I use Notion to create a customer feedback system for my digital product?',
      topic_id: '2',
    },
    {
      id: '60',
      title:
        'How can I use Notion to create a product roadmap for my digital product?',
      topic_id: '2',
    },
    {
      id: '61',
      title:
        'How can I use Notion to create a product launch plan for my digital product?',
      topic_id: '2',
    },
    {
      id: '62',
      title:
        'How can I use Notion to create a product pricing strategy for my digital product?',
      topic_id: '2',
    },
    {
      id: '63',
      title:
        'How can I use Notion to create a user onboarding process for my digital product?',
      topic_id: '2',
    },
    {
      id: '64',
      title:
        'How can I use Notion to create a customer journey map for my digital product?',
      topic_id: '2',
    },
    {
      id: '65',
      title:
        'How can I use Notion to create a customer retention strategy for my digital product?',
      topic_id: '2',
    },
    {
      id: '66',
      title:
        'How can I use Notion to create a customer analytics system for my digital product?',
      topic_id: '2',
    },
    {
      id: '67',
      title:
        'How can I use Notion to create a customer data management system for my digital product?',
      topic_id: '2',
    },
    {
      id: '68',
      title:
        'How can I use Notion to create a customer feedback analysis system for my digital product?',
      topic_id: '2',
    },
    {
      id: '69',
      title:
        'How can I use Notion to create a sales funnel for my digital product?',
      topic_id: '2',
    },
    {
      id: '70',
      title:
        'How can I use Notion to create a lead generation system for my digital product?',
      topic_id: '2',
    },
    {
      id: '71',
      title:
        'How can I use Notion to create a sales pipeline for my digital product?',
      topic_id: '2',
    },
    {
      id: '72',
      title:
        'How can I use Notion to create a sales team management system for my digital product?',
      topic_id: '2',
    },
    {
      id: '73',
      title:
        'How can I use Notion to create a sales training program for my digital product?',
      topic_id: '2',
    },
    {
      id: '74',
      title:
        'How can I use Notion to create a sales commission tracking system for my digital product?',
      topic_id: '2',
    },
    {
      id: '75',
      title:
        'How can I use Notion to create a sales analytics system for my digital product?',
      topic_id: '2',
    },
    {
      id: '76',
      title:
        "How can I use Notion's sharing feature to collaborate with team members on my digital product?",
      topic_id: '2',
    },
    {
      id: '77',
      title:
        "How can I use Notion's permissions feature to control access to my digital product?",
      topic_id: '2',
    },
    {
      id: '78',
      title:
        "How can I use Notion's export feature to share my digital product with others?",
      topic_id: '2',
    },
    {
      id: '79',
      title:
        "How can I use Notion's integration feature with other apps and platforms to share my digital product?",
      topic_id: '2',
    },
    {
      id: '80',
      title:
        "How can I use Notion's link sharing feature to share specific pages or sections of my digital product with others?",
      topic_id: '2',
    },
    {
      id: '81',
      title: 'What are the best ways to track and prioritize tasks in Notion?',
      topic_id: '3',
    },
    {
      id: '82',
      title: 'How can I use Notion to manage my daily routines and schedule?',
      topic_id: '3',
    },
    {
      id: '83',
      title:
        'What are the best templates and systems for organizing my personal projects in Notion?',
      topic_id: '3',
    },
    {
      id: '84',
      title:
        'How can I use Notion to keep track of my goals and progress over time?',
      topic_id: '3',
    },
    {
      id: '85',
      title: 'What are the best ways to take and organize notes in Notion?',
      topic_id: '3',
    },
    {
      id: '86',
      title: 'How can I use Notion to manage my finances and budget?',
      topic_id: '3',
    },
    {
      id: '87',
      title:
        'How can I use Notion to keep track of my health and wellness information?',
      topic_id: '3',
    },
    {
      id: '88',
      title:
        'How can I use Notion to store and access important documents and files efficiently?',
      topic_id: '3',
    },
    {
      id: '89',
      title:
        'How can I use Notion to manage my relationships and communication with friends, family, and colleagues?',
      topic_id: '3',
    },
    {
      id: '90',
      title: 'How can I use Notion to keep track of my courses and learning?',
      topic_id: '3',
    },
    {
      id: '91',
      title: 'How can I use Notion to track my habits and personal growth?',
      topic_id: '3',
    },
    {
      id: '92',
      title:
        'How can I use Notion to stay organized while working on multiple projects at once?',
      topic_id: '3',
    },
    {
      id: '93',
      title: 'How can I use Notion to plan and organize my travels?',
      topic_id: '3',
    },
    {
      id: '94',
      title: 'How can I use Notion to manage my personal networks?',
      topic_id: '3',
    },
    {
      id: '95',
      title:
        'How can I use Notion to plan and prioritize my time for maximum productivity?',
      topic_id: '3',
    },
    {
      id: '96',
      title:
        'How can I use Notion to streamline my work processes and systems?',
      topic_id: '3',
    },
    {
      id: '97',
      title: 'How can I use Notion to manage my student life effectively?',
      topic_id: '3',
    },
    {
      id: '98',
      title:
        'How can I use Notion to track my time and increase my time management skills?',
      topic_id: '3',
    },
    {
      id: '99',
      title: 'How can I use Notion to track my fitness and nutrition goals?',
      topic_id: '3',
    },
    {
      id: '100',
      title: 'How can I use Notion to manage my mental health and well-being?',
      topic_id: '3',
    },
    {
      id: '101',
      title:
        'How can I use Notion to streamline my household and personal responsibilities?',
      topic_id: '3',
    },
    {
      id: '102',
      title: 'How can I use Notion to manage my personal projects and hobbies?',
      topic_id: '3',
    },
    {
      id: '103',
      title:
        'How can I use Notion to keep track of my physical and mental energy levels?',
      topic_id: '3',
    },
    {
      id: '104',
      title:
        'How can I use Notion to prioritize and manage my self-care activities?',
      topic_id: '3',
    },
    {
      id: '105',
      title:
        'How can I use Notion to manage and track my creativity and inspiration?',
      topic_id: '3',
    },
    {
      id: '106',
      title:
        'How can I use Notion to keep track of my learning and educational goals?',
      topic_id: '3',
    },
    {
      id: '107',
      title: 'How can I use Notion to manage my long-term goals?',
      topic_id: '3',
    },
    {
      id: '108',
      title:
        'How can I use Notion to manage my personal tasks from multiple devices?',
      topic_id: '3',
    },
    {
      id: '109',
      title:
        'How can I use Notion to increase my accountability and productivity?',
      topic_id: '3',
    },
    {
      id: '110',
      title:
        'How can I use Notion to automate repetitive tasks and increase my efficiency?',
      topic_id: '3',
    },
    {
      id: '111',
      title: 'How can I use Notion to manage my work schedule and deadlines?',
      topic_id: '4',
    },
    {
      id: '112',
      title:
        'What are the best templates and systems for organizing and tracking work projects in Notion?',
      topic_id: '4',
    },
    {
      id: '113',
      title:
        'How can I use Notion to keep track of my professional development and learning?',
      topic_id: '4',
    },
    {
      id: '114',
      title:
        'How can I use Notion to keep track of my professional network and relationships?',
      topic_id: '4',
    },
    {
      id: '115',
      title:
        'How can I use Notion to manage and delegate tasks with a team in a work setting?',
      topic_id: '4',
    },
    {
      id: '116',
      title:
        'How can I use Notion to plan and prioritize my workday for maximum productivity?',
      topic_id: '4',
    },
    {
      id: '117',
      title:
        'How can I use Notion to streamline work processes and systems for efficiency?',
      topic_id: '4',
    },
    {
      id: '118',
      title:
        'How can I use Notion to manage and track my workload effectively?',
      topic_id: '4',
    },
    {
      id: '119',
      title:
        'How can I use Notion to track my professional goals and progress over time?',
      topic_id: '4',
    },
    {
      id: '120',
      title: 'How can I use Notion to manage my work finances and budget?',
      topic_id: '4',
    },
    {
      id: '121',
      title:
        'How can I use Notion to store and access important work documents and files efficiently?',
      topic_id: '4',
    },
    {
      id: '122',
      title:
        'How can I use Notion to communicate and collaborate with colleagues effectively?',
      topic_id: '4',
    },
    {
      id: '123',
      title:
        'How can I use Notion to track work-related expenses and receipts?',
      topic_id: '4',
    },
    {
      id: '124',
      title: 'How can I use Notion to track work-related travel and expenses?',
      topic_id: '4',
    },
    {
      id: '125',
      title:
        'How can I use Notion to manage my work schedule and appointments?',
      topic_id: '4',
    },
    {
      id: '126',
      title:
        'How can I use Notion to manage my work-related tasks and to-do list?',
      topic_id: '4',
    },
    {
      id: '127',
      title:
        'How can I use Notion to keep track of work-related research and resources?',
      topic_id: '4',
    },
    {
      id: '128',
      title:
        'How can I use Notion to manage and track my professional network and relationships?',
      topic_id: '4',
    },
    {
      id: '129',
      title:
        'How can I use Notion to plan and manage work events and conferences?',
      topic_id: '4',
    },
    {
      id: '130',
      title:
        'How can I use Notion to track work-related time and increase my time management skills?',
      topic_id: '4',
    },
    {
      id: '131',
      title:
        'How can I use Notion to manage work-related priorities and deadlines?',
      topic_id: '4',
    },
    {
      id: '132',
      title:
        'How can I use Notion to manage and prioritize multiple work projects at once?',
      topic_id: '4',
    },
    {
      id: '133',
      title:
        'How can I use Notion to keep track of work-related ideas and inspiration?',
      topic_id: '4',
    },
    {
      id: '134',
      title:
        'How can I use Notion to manage work-related communications and emails?',
      topic_id: '4',
    },
    {
      id: '135',
      title:
        'How can I use Notion to manage work-related team meetings and discussions?',
      topic_id: '4',
    },
    {
      id: '136',
      title:
        'How can I use Notion to manage work-related customer and client information?',
      topic_id: '4',
    },
    {
      id: '137',
      title: 'How can I use Notion to track work-related sales and revenue?',
      topic_id: '4',
    },
    {
      id: '138',
      title:
        'How can I use Notion to manage work-related resources and supplies?',
      topic_id: '4',
    },
    {
      id: '139',
      title:
        'How can I use Notion to manage work-related quality control and performance metrics?',
      topic_id: '4',
    },
    {
      id: '140',
      title:
        'How can I use Notion to manage work-related training and professional development?',
      topic_id: '4',
    },
    {
      id: '141',
      title: 'How can I use Notion to create a business plan and strategy?',
      topic_id: '5',
    },
    {
      id: '142',
      title:
        'How can I use Notion to track and manage finances for my business?',
      topic_id: '5',
    },
    {
      id: '143',
      title:
        'How can I use Notion to keep track of business expenses and income?',
      topic_id: '5',
    },
    {
      id: '144',
      title: 'How can I use Notion to manage and delegate tasks among my team?',
      topic_id: '5',
    },
    {
      id: '145',
      title: 'How can I use Notion to create and manage a business calendar?',
      topic_id: '5',
    },
    {
      id: '146',
      title:
        'How can I use Notion to keep track of business goals and progress?',
      topic_id: '5',
    },
    {
      id: '147',
      title:
        'How can I use Notion to store and manage business-related documents and files?',
      topic_id: '5',
    },
    {
      id: '148',
      title:
        'How can I use Notion to manage and track customer information for my business?',
      topic_id: '5',
    },
    {
      id: '149',
      title:
        'How can I use Notion to manage and track sales and revenue for my business?',
      topic_id: '5',
    },
    {
      id: '150',
      title:
        'How can I use Notion to plan and prioritize business-related tasks and to-do list?',
      topic_id: '5',
    },
    {
      id: '151',
      title:
        'How can I use Notion to track and manage inventory for my business?1',
      topic_id: '5',
    },
    {
      id: '152',
      title: 'How can I use Notion to create and manage a business budget?',
      topic_id: '5',
    },
    {
      id: '153',
      title:
        'How can I use Notion to track business-related communications and emails?',
      topic_id: '5',
    },
    {
      id: '154',
      title:
        'How can I use Notion to manage and track business expenses and receipts?',
      topic_id: '5',
    },
    {
      id: '155',
      title:
        'How can I use Notion to manage business-related travel and expenses?',
      topic_id: '5',
    },
    {
      id: '156',
      title:
        'How can I use Notion to manage and track business-related appointments and meetings?',
      topic_id: '5',
    },
    {
      id: '157',
      title:
        'How can I use Notion to create and manage a business blog and content strategy?',
      topic_id: '5',
    },
    {
      id: '158',
      title:
        'How can I use Notion to manage and track business-related research and resources?',
      topic_id: '5',
    },
    {
      id: '159',
      title:
        'How can I use Notion to manage and track business-related quality control and performance metrics?',
      topic_id: '5',
    },
    {
      id: '160',
      title:
        'How can I use Notion to manage and track business-related marketing and advertising efforts?',
      topic_id: '5',
    },
    {
      id: '161',
      title:
        'How can I use Notion to manage and prioritize multiple business projects at once?',
      topic_id: '5',
    },
    {
      id: '162',
      title:
        'How can I use Notion to keep track of business-related ideas and inspiration?',
      topic_id: '5',
    },
    {
      id: '163',
      title:
        'How can I use Notion to manage and track business-related partnerships and collaborations?',
      topic_id: '5',
    },
    {
      id: '164',
      title:
        'How can I use Notion to manage and track business-related resources and supplies?',
      topic_id: '5',
    },
    {
      id: '165',
      title:
        'How can I use Notion to manage and track business-related training and professional development?',
      topic_id: '5',
    },
    {
      id: '166',
      title:
        'How can I use Notion to manage and track business-related customer support and feedback?',
      topic_id: '5',
    },
    {
      id: '167',
      title:
        'How can I use Notion to manage and track business-related legal and regulatory compliance?',
      topic_id: '5',
    },
    {
      id: '168',
      title:
        'How can I use Notion to manage and track business-related human resources and employee information? How can I use Notion to manage and track business-related website and online presence?',
      topic_id: '5',
    },
    {
      id: '169',
      title:
        'How can I use Notion to manage and track business-related public relations and media outreach?',
      topic_id: '5',
    },
    {
      id: '170',
      title:
        'How can I use Notion to create a content calendar for my YouTube channel?',
      topic_id: '6',
    },
    {
      id: '171',
      title:
        'How can I use Notion to track and manage my YouTube video ideas and production?',
      topic_id: '6',
    },
    {
      id: '172',
      title:
        'How can I use Notion to track and manage my Twitter content and schedule?',
      topic_id: '6',
    },
    {
      id: '173',
      title:
        'How can I use Notion to track and manage blog post ideas and production?',
      topic_id: '6',
    },
    {
      id: '174',
      title:
        'How can I use Notion to keep track of social media metrics and analytics for my content?',
      topic_id: '6',
    },
    {
      id: '175',
      title:
        'How can I use Notion to manage and store content assets such as images and videos?',
      topic_id: '6',
    },
    {
      id: '176',
      title:
        'How can I use Notion to manage and delegate tasks related to content creation and production?',
      topic_id: '6',
    },
    {
      id: '177',
      title:
        'How can I use Notion to track and manage collaborations with other content creators and brands?',
      topic_id: '6',
    },
    {
      id: '178',
      title:
        'How can I use Notion to create and manage a content marketing plan and strategy?',
      topic_id: '6',
    },
    {
      id: '179',
      title:
        'How can I use Notion to track and manage content-related expenses and income?',
      topic_id: '6',
    },
    {
      id: '180',
      title:
        'How can I use Notion to create and manage a workflow for editing and publishing my content?',
      topic_id: '6',
    },
    {
      id: '181',
      title:
        'How can I use Notion to track and manage content-related research and resources?',
      topic_id: '6',
    },
    {
      id: '182',
      title:
        'How can I use Notion to create and manage a content ideas and inspiration board?',
      topic_id: '6',
    },
    {
      id: '183',
      title:
        'How can I use Notion to track and manage my social media engagement and interactions?',
      topic_id: '6',
    },
    {
      id: '184',
      title:
        'How can I use Notion to create and manage a content distribution plan and strategy?',
      topic_id: '6',
    },
    {
      id: '185',
      title:
        'How can I use Notion to manage and track content-related promotional and advertising efforts?',
      topic_id: '6',
    },
    {
      id: '186',
      title:
        'How can I use Notion to keep track of important dates and events related to my content?',
      topic_id: '6',
    },
    {
      id: '187',
      title:
        'How can I use Notion to manage and track content-related feedback and comments from my audience?',
      topic_id: '6',
    },
    {
      id: '188',
      title:
        'How can I use Notion to manage and track content-related goals and progress?',
      topic_id: '6',
    },
    {
      id: '189',
      title:
        'How can I use Notion to manage and track content-related copyright and legal information?',
      topic_id: '6',
    },
    {
      id: '190',
      title:
        'How can I use Notion to create and manage a system for organizing and storing my content library?',
      topic_id: '6',
    },
    {
      id: '191',
      title:
        'How can I use Notion to create and manage a content creation checklist and process?',
      topic_id: '6',
    },
    {
      id: '192',
      title:
        'How can I use Notion to manage and track my personal brand and image across different social media platforms?',
      topic_id: '6',
    },
    {
      id: '193',
      title:
        'How can I use Notion to create and manage a workflow for repurposing and updating old content?',
      topic_id: '6',
    },
    {
      id: '194',
      title:
        'How can I use Notion to track and manage my social media influencer partnerships and collaborations?',
      topic_id: '6',
    },
    {
      id: '195',
      title:
        'How can I use Notion to create and manage a system for tracking and improving my content quality and performance?',
      topic_id: '6',
    },
    {
      id: '196',
      title:
        'How can I use Notion to create and manage a system for tracking and improving my audience growth and engagement?',
      topic_id: '6',
    },
    {
      id: '197',
      title:
        'How can I use Notion to track and manage content-related expenses and budgets?',
      topic_id: '6',
    },
    {
      id: '198',
      title:
        'How can I use Notion to track and manage content-related email and other communications with my audience and fans?',
      topic_id: '6',
    },
    {
      id: '199',
      title:
        'How can I use Notion to track and manage content-related professional development and training opportunities?',
      topic_id: '6',
    },
    {
      id: '200',
      title: 'What are the key considerations when planning a digital product?',
      topic_id: '7',
    },
    {
      id: '201',
      title: 'How can I determine the target market for my digital product?',
      topic_id: '7',
    },
    {
      id: '202',
      title:
        'What are some essential features that should be included in a digital product?',
      topic_id: '7',
    },
    {
      id: '203',
      title:
        'How do I choose the right technology stack for my digital product?',
      topic_id: '7',
    },
    {
      id: '204',
      title: 'What are the best tools for prototyping a digital product?',
      topic_id: '7',
    },
    {
      id: '205',
      title: 'How do I conduct user testing for my digital product?',
      topic_id: '7',
    },
    {
      id: '206',
      title:
        'What are some common mistakes to avoid when creating a digital product?',
      topic_id: '7',
    },
    {
      id: '207',
      title: 'How do I determine the pricing for my digital product?',
      topic_id: '7',
    },
    {
      id: '208',
      title: 'What are the best ways to market a digital product?',
      topic_id: '7',
    },
    {
      id: '209',
      title: 'How do I measure the success of my digital product?',
      topic_id: '7',
    },
    {
      id: '210',
      title:
        'What are the best ways to gather feedback from users of my digital product?',
      topic_id: '7',
    },
    {
      id: '211',
      title: 'How do I handle scalability for my digital product?',
      topic_id: '7',
    },
    {
      id: '212',
      title:
        'What are the key factors that contribute to the success of a digital product?',
      topic_id: '7',
    },
    {
      id: '213',
      title: 'How can I measure the success of my digital product?',
      topic_id: '7',
    },
    {
      id: '214',
      title:
        'What are some best practices for marketing and promoting a digital product to ensure its success?',
      topic_id: '7',
    },
    {
      id: '215',
      title:
        'What are the key considerations when designing a high-quality digital product?',
      topic_id: '8',
    },
    {
      id: '216',
      title: 'How can I ensure that my digital product is user-friendly?',
      topic_id: '8',
    },
    {
      id: '217',
      title:
        'What are the best practices for designing user interfaces for digital products?',
      topic_id: '8',
    },
    {
      id: '218',
      title: 'How do I conduct user testing for my digital product?',
      topic_id: '8',
    },
    {
      id: '219',
      title:
        'What are the most important features that a digital product should have?',
      topic_id: '8',
    },
    {
      id: '220',
      title:
        'How can I ensure that my digital product is accessible to all users?',
      topic_id: '8',
    },
    {
      id: '221',
      title:
        'What are the best ways to gather feedback from users of my digital product?',
      topic_id: '8',
    },
    {
      id: '222',
      title: 'How can I ensure that my digital product is mobile-friendly?',
      topic_id: '8',
    },
    {
      id: '223',
      title:
        'What are the best tools for creating analytics for a digital product?',
      topic_id: '8',
    },
    {
      id: '224',
      title:
        'How do I handle data privacy and compliance for my digital product?',
      topic_id: '8',
    },
    {
      id: '225',
      title:
        'What are the best practices for designing a landing page for a digital product?',
      topic_id: '8',
    },
    {
      id: '226',
      title: 'How do I handle scalability for my digital product?',
      topic_id: '8',
    },
    {
      id: '227',
      title:
        'What are the best ways to handle user engagement for a digital product?',
      topic_id: '8',
    },
    {
      id: '228',
      title:
        'How do I handle integration with other platforms and services for my digital product?',
      topic_id: '8',
    },
    {
      id: '229',
      title:
        'How do I handle search engine optimization (SEO) for my digital product?',
      topic_id: '8',
    },
    {
      id: '230',
      title:
        'How do I handle integration with social media for my digital product?',
      topic_id: '8',
    },
    {
      id: '231',
      title:
        'What are the best ways to handle user onboarding for a digital product?',
      topic_id: '8',
    },
    {
      id: '232',
      title:
        'How do I handle integration with payment systems for my digital product?',
      topic_id: '8',
    },
    {
      id: '233',
      title:
        'What are the best tools for creating a customer service chatbot for a digital product?',
      topic_id: '8',
    },
    {
      id: '234',
      title:
        'What are the best tools for creating a marketing automation system for a digital product?',
      topic_id: '8',
    },
    {
      id: '235',
      title: 'How do I ensure that my digital product is visually appealing?',
      topic_id: '8',
    },
    {
      id: '236',
      title:
        'How can I create a compelling user experience for my digital product?',
      topic_id: '8',
    },
    {
      id: '237',
      title:
        'How can I design a digital product that is easy to use and understand?',
      topic_id: '8',
    },
    {
      id: '238',
      title:
        'How can I make my digital product stand out from similar products on the market?',
      topic_id: '8',
    },
    {
      id: '239',
      title:
        'How can I make my digital product easy to personalize and customize for different users?',
      topic_id: '8',
    },
    {
      id: '240',
      title:
        'What are the key elements that should be included in an offer page?',
      topic_id: '9',
    },
    {
      id: '241',
      title: 'How can I make my offer stand out on the page?',
      topic_id: '9',
    },
    {
      id: '242',
      title:
        'What is the best way to present the benefits of my product on the offer page?',
      topic_id: '9',
    },
    {
      id: '243',
      title:
        'How can I effectively communicate the value proposition of my product on the offer page?',
      topic_id: '9',
    },
    {
      id: '244',
      title:
        'What kind of language should I use on the offer page to evoke emotions and drive conversions?',
      topic_id: '9',
    },
    {
      id: '245',
      title:
        'How can I use social proof to increase the credibility of my product on the offer page?',
      topic_id: '9',
    },
    {
      id: '246',
      title:
        'What are the best practices for displaying pricing information on an offer page?',
      topic_id: '9',
    },
    {
      id: '247',
      title:
        'How can I design a call-to-action (CTA) button that maximizes conversions on the offer page?',
      topic_id: '9',
    },
    {
      id: '248',
      title:
        'How can I use trust symbols and security badges to build trust with potential customers on the offer page?',
      topic_id: '9',
    },
    {
      id: '249',
      title:
        'How can I make the buying process as simple and seamless as possible for potential customers on the offer page?',
      topic_id: '9',
    },
    {
      id: '250',
      title:
        'What are the best ways to reduce friction and objections during the buying process on the offer page?',
      topic_id: '9',
    },
    {
      id: '251',
      title:
        'How can I effectively use limited-time offers and scarcity to drive conversions on the offer page?',
      topic_id: '9',
    },
    {
      id: '252',
      title:
        'What are the best practices for creating a sense of urgency on the offer page?',
      topic_id: '9',
    },
    {
      id: '253',
      title:
        'How can I use visuals and multimedia to enhance the offer page and increase conversions?',
      topic_id: '9',
    },
    {
      id: '254',
      title:
        'What are the best ways to optimize the offer page for mobile devices?',
      topic_id: '9',
    },
    {
      id: '255',
      title:
        'How can I use customer testimonials to build trust and drive conversions on the offer page?',
      topic_id: '9',
    },
    {
      id: '256',
      title:
        'What are the best ways to use storytelling to engage potential customers on the offer page?',
      topic_id: '9',
    },
    {
      id: '257',
      title:
        'How can I use a clear and simple guarantee to build trust and increase conversions on the offer page?',
      topic_id: '9',
    },
    {
      id: '258',
      title:
        'What are the best ways to use psychological triggers to influence conversions on the offer page?',
      topic_id: '9',
    },
    {
      id: '259',
      title:
        'How can I use progressive disclosure to reveal information about the product in a way that drives conversions on the offer page?',
      topic_id: '9',
    },
    {
      id: '260',
      title:
        'How can I use animation and micro-interactions to make the offer page more engaging and interactive?',
      topic_id: '9',
    },
    {
      id: '261',
      title:
        'What are the best practices for creating a sense of exclusivity and prestige on the offer page?',
      topic_id: '9',
    },
    {
      id: '262',
      title:
        'How can I use contrast and attention-grabbing elements to make the offer stand out on the page?',
      topic_id: '9',
    },
    {
      id: '263',
      title:
        'What are the best practices for using conversational language on the offer page?',
      topic_id: '9',
    },
    {
      id: '264',
      title:
        'How can I effectively use customer reviews and ratings on the offer page?',
      topic_id: '9',
    },
    {
      id: '265',
      title:
        'How can I use customer pain points and objections to create compelling arguments for the product on the offer page?',
      topic_id: '9',
    },
    {
      id: '266',
      title:
        'How can I use a sense of community and belonging to drive conversions on the offer page?',
      topic_id: '9',
    },
    {
      id: '267',
      title:
        'What are the best ways to use empathy and emotional appeals to connect with potential customers on the offer page?',
      topic_id: '9',
    },
    {
      id: '268',
      title:
        'How can I use progress indicators and loaders to reduce friction and keep potential customers engaged on the offer page?',
      topic_id: '9',
    },
    {
      id: '269',
      title:
        'How can I use personalized recommendations and upsells to increase the average order value on the offer page?',
      topic_id: '9',
    },
    {
      id: '270',
      title:
        'What are the most effective pricing strategies for a digital product?',
      topic_id: '10',
    },
    {
      id: '271',
      title: 'How can I determine the optimal price for my digital product?',
      topic_id: '10',
    },
    {
      id: '272',
      title:
        'What are the best ways to increase the perceived value of my digital product?',
      topic_id: '10',
    },
    {
      id: '273',
      title:
        'How can I effectively use upselling and cross-selling to increase the revenue generated from my digital product?',
      topic_id: '10',
    },
    {
      id: '274',
      title:
        'What are the best ways to use freemium pricing to drive conversions and monetize my digital product?',
      topic_id: '10',
    },
    {
      id: '275',
      title:
        'How can I use subscriptions and recurring revenue models to monetize my digital product?',
      topic_id: '10',
    },
    {
      id: '276',
      title:
        'What are the best practices for creating and managing a premium membership program?',
      topic_id: '10',
    },
    {
      id: '277',
      title:
        'How can I use limited-time offers and scarcity to drive conversions and increase revenue from my digital product?',
      topic_id: '10',
    },
    {
      id: '278',
      title:
        'How can I use discounts and promotions to drive sales and monetize my digital product?',
      topic_id: '10',
    },
    {
      id: '279',
      title:
        'What are the best ways to use affiliate marketing to monetize my digital product?',
      topic_id: '10',
    },
    {
      id: '280',
      title:
        'How can I effectively use sponsored content and influencer marketing to promote and monetize my digital product?',
      topic_id: '10',
    },
    {
      id: '281',
      title:
        'How can I use email marketing to drive sales and monetize my digital product?',
      topic_id: '10',
    },
    {
      id: '282',
      title:
        'What are the best practices for creating and launching a successful marketing campaign for my digital product?',
      topic_id: '10',
    },
    {
      id: '283',
      title:
        'How can I use social media to promote and monetize my digital product?',
      topic_id: '10',
    },
    {
      id: '284',
      title:
        'What are the best ways to use content marketing to promote and monetize my digital product?',
      topic_id: '10',
    },
    {
      id: '285',
      title:
        'How can I use referral marketing to drive sales and monetize my digital product?',
      topic_id: '10',
    },
    {
      id: '286',
      title:
        'How can I effectively use video marketing to promote and monetize my digital product?',
      topic_id: '10',
    },
    {
      id: '287',
      title:
        'What are the best ways to use paid advertising to drive sales and monetize my digital product?',
      topic_id: '10',
    },
    {
      id: '288',
      title:
        'How can I use landing pages to maximize conversions and monetize my digital product?',
      topic_id: '10',
    },
    {
      id: '289',
      title:
        'How can I use analytics and data to optimize pricing, marketing, and monetization strategies for my digital product?',
      topic_id: '10',
    },
    {
      id: '290',
      title:
        'What are the best practices for creating a compelling and effective sales page for my digital product?',
      topic_id: '10',
    },
    {
      id: '291',
      title:
        'How can I use customer feedback and testimonials to improve and monetize my digital product?',
      topic_id: '10',
    },
    {
      id: '292',
      title:
        'How can I use gamification and rewards to increase engagement and monetize my digital product?',
      topic_id: '10',
    },
    {
      id: '293',
      title:
        'How can I effectively use partnerships and collaborations to promote and monetize my digital product?',
      topic_id: '10',
    },
    {
      id: '294',
      title:
        'What are the best ways to use community building and engagement to monetize my digital product?',
      topic_id: '10',
    },
    {
      id: '295',
      title: 'How can I create a pricing strategy for my digital product?',
      topic_id: '10',
    },
    {
      id: '296',
      title: 'What are the different monetization models for digital products?',
      topic_id: '10',
    },
    {
      id: '297',
      title:
        'How can I increase the value of my digital product to justify a higher price?',
      topic_id: '10',
    },
    {
      id: '298',
      title: 'How can I offer different pricing tiers for my digital product?',
      topic_id: '10',
    },
    {
      id: '299',
      title:
        'How can I offer special deals and promotions for my digital product?',
      topic_id: '10',
    },
    {
      id: '300',
      title:
        'How can I conduct A/B testing to determine the best pricing strategy for my digital product?',
      topic_id: '10',
    },
    {
      id: '301',
      title: 'How can I create a sales funnel to monetize my digital product?',
      topic_id: '10',
    },
    {
      id: '302',
      title:
        'How can I use social proof to increase conversions for my digital product?',
      topic_id: '10',
    },
    {
      id: '303',
      title:
        'How can I use scarcity and urgency tactics to increase sales of my digital product?',
      topic_id: '10',
    },
    {
      id: '304',
      title:
        'How can I use email marketing to promote and sell my digital product?',
      topic_id: '10',
    },
    {
      id: '305',
      title:
        'How can I use influencer marketing to promote and sell my digital product?',
      topic_id: '10',
    },
    {
      id: '306',
      title:
        'How can I use search engine optimization (SEO) to drive traffic to my digital product?',
      topic_id: '10',
    },
    {
      id: '307',
      title:
        'How can I use paid advertising to drive traffic to my digital product?',
      topic_id: '10',
    },
    {
      id: '308',
      title:
        'How can I use content marketing to promote and sell my digital product?',
      topic_id: '10',
    },
    {
      id: '309',
      title:
        'How can I use video marketing to promote and sell my digital product?',
      topic_id: '10',
    },
    {
      id: '310',
      title:
        'How can I use artificial intelligence to promote and sell my digital product?',
      topic_id: '10',
    },
    {
      id: '311',
      title: 'How can I use sponsored content to monetize my digital product?',
      topic_id: '10',
    },
    {
      id: '312',
      title: 'How can I use branded content to monetize my digital product?',
      topic_id: '10',
    },
    {
      id: '313',
      title:
        'How can I use affiliate marketing to monetize my digital product?',
      topic_id: '10',
    },
    {
      id: '314',
      title: 'How can I use upselling and cross-selling to monetize',
      topic_id: '10',
    },
    {
      id: '315',
      title:
        'How can I use data analytics to optimize pricing strategy for my digital product?',
      topic_id: '10',
    },
    {
      id: '316',
      title:
        'How can I use customer lifetime value to inform pricing strategy for my digital product?',
      topic_id: '10',
    },
    {
      id: '317',
      title:
        'How can I use dynamic pricing to optimize revenue for my digital product?',
      topic_id: '10',
    },
    {
      id: '318',
      title:
        'How can I use price bundling to increase the perceived value of my digital product?',
      topic_id: '10',
    },
    {
      id: '319',
      title:
        "How can I use value-based pricing to align my digital product's pricing with its perceived value to customers?",
      topic_id: '10',
    },
    {
      id: '320',
      title:
        'How can I create a compelling user experience for my digital product?',
      topic_id: '11',
    },
    {
      id: '321',
      title:
        'How can I design a digital product that is easy to use and understand?',
      topic_id: '11',
    },
    {
      id: '322',
      title:
        'How can I make my digital product stand out from similar products on the market?',
      topic_id: '11',
    },
    {
      id: '323',
      title:
        'How can I make my digital product easy to personalize and customize for different users?',
      topic_id: '11',
    },
    {
      id: '324',
      title: 'How can I create a referral program for my digital product?',
      topic_id: '11',
    },
    {
      id: '325',
      title: 'How can I create a community for my digital product?',
      topic_id: '11',
    },
    {
      id: '326',
      title: 'How can I create a social network for my digital product?',
      topic_id: '11',
    },
    {
      id: '327',
      title:
        'How can I create a user-generated content feature for my digital product?',
      topic_id: '11',
    },
    {
      id: '328',
      title: 'How can I create a leaderboard for my digital product?',
      topic_id: '11',
    },
    {
      id: '329',
      title: 'How can I create a progress tracker for my digital product?',
      topic_id: '11',
    },
    {
      id: '330',
      title: 'How can I create a badge system for my digital product?',
      topic_id: '11',
    },
    {
      id: '331',
      title: 'How can I create a virtual currency for my digital product?',
      topic_id: '11',
    },
    {
      id: '332',
      title: 'How can I create a sense of urgency in my digital product?',
      topic_id: '11',
    },
    {
      id: '333',
      title: 'How can I create a sense of scarcity in my digital product?',
      topic_id: '11',
    },
    {
      id: '334',
      title: 'How can I create a sense of exclusivity in my digital product?',
      topic_id: '11',
    },
    {
      id: '335',
      title:
        'How can I create a sense of accomplishment in my digital product?',
      topic_id: '11',
    },
    {
      id: '336',
      title: 'How can I create a sense of progress in my digital product?',
      topic_id: '11',
    },
    {
      id: '337',
      title: 'How can I create a sense of surprise in my digital product?',
      topic_id: '11',
    },
    {
      id: '338',
      title: 'How can I create a sense of adventure in my digital product?',
      topic_id: '11',
    },
    {
      id: '339',
      title: 'How can I create a sense of mystery in my digital product?',
      topic_id: '11',
    },
    {
      id: '340',
      title: 'How can I create a sense of discovery in my digital product?',
      topic_id: '11',
    },
    {
      id: '341',
      title: 'How can I create a sense of community in my digital product?',
      topic_id: '11',
    },
    {
      id: '342',
      title: 'How can I create a sense of membership in my digital product?',
      topic_id: '11',
    },
    {
      id: '343',
      title: 'How can I create a sense of ownership in my digital product?',
      topic_id: '11',
    },
    {
      id: '344',
      title: 'How can I create a sense of investment in my digital product?',
      topic_id: '11',
    },
    {
      id: '345',
      title:
        'How can I create a sense of personalization in my digital product?',
      topic_id: '11',
    },
    {
      id: '346',
      title:
        'How can I create a sense of self-discovery in my digital product?',
      topic_id: '11',
    },
    {
      id: '347',
      title:
        'How can I create a sense of personal growth in my digital product?',
      topic_id: '11',
    },
    {
      id: '348',
      title:
        'How can I create a sense of personal achievement in my digital product?',
      topic_id: '11',
    },
    {
      id: '349',
      title:
        'How can I use notifications and push messages effectively to keep users engaged with my digital product?',
      topic_id: '11',
    },
    {
      id: '350',
      title:
        'How can I use A/B testing to optimize the performance of my digital product?',
      topic_id: '12',
    },
    {
      id: '351',
      title:
        'How can I use analytics to track user behavior and optimize my digital product?',
      topic_id: '12',
    },
    {
      id: '352',
      title:
        'How can I use heat maps to identify user engagement and optimize my digital product?',
      topic_id: '12',
    },
    {
      id: '353',
      title:
        'How can I use session recordings to identify user behavior and optimize my digital product?',
      topic_id: '12',
    },
    {
      id: '354',
      title: 'How can I use user feedback to optimize my digital product?',
      topic_id: '12',
    },
    {
      id: '355',
      title:
        'How can I use surveys to gather user feedback and optimize my digital product?',
      topic_id: '12',
    },
    {
      id: '356',
      title:
        'How can I use usability testing to identify and fix user experience issues and optimize my digital product?',
      topic_id: '12',
    },
    {
      id: '357',
      title:
        'How can I use user testing to identify and fix user experience issues and optimize my digital product?',
      topic_id: '12',
    },
    {
      id: '358',
      title:
        'How can I use load testing to optimize the performance of my digital product?',
      topic_id: '12',
    },
    {
      id: '359',
      title:
        'How can I use stress testing to optimize the performance of my digital product?',
      topic_id: '12',
    },
    {
      id: '360',
      title:
        'How can I use performance monitoring to optimize the performance of my digital product?',
      topic_id: '12',
    },
    {
      id: '361',
      title:
        'How can I use scalability testing to optimize the performance of my digital product?',
      topic_id: '12',
    },
    {
      id: '362',
      title:
        'How can I use capacity planning to optimize the performance of my digital product?',
      topic_id: '12',
    },
    {
      id: '363',
      title:
        'How can I use disaster recovery testing to optimize the performance of my digital product?',
      topic_id: '12',
    },
    {
      id: '364',
      title:
        'How can I use regression testing to optimize the performance of my digital product?',
      topic_id: '12',
    },
    {
      id: '365',
      title:
        'How can I use user acceptance testing to optimize the performance of my digital product?',
      topic_id: '12',
    },
    {
      id: '366',
      title:
        'How can I use integration testing to optimize the performance of my digital product?',
      topic_id: '12',
    },
    {
      id: '367',
      title:
        'How can I use performance benchmarking to optimize the performance of my digital product?',
      topic_id: '12',
    },
    {
      id: '368',
      title:
        'How can I use code optimization to optimize the performance of my digital product?',
      topic_id: '12',
    },
    {
      id: '369',
      title:
        'How can I use caching to optimize the performance of my digital product?',
      topic_id: '12',
    },
    {
      id: '370',
      title:
        'How can I use minification and compression techniques to optimize the speed and reduce latency of my digital product?',
      topic_id: '12',
    },
    {
      id: '371',
      title:
        'How can I use browser caching to optimize the speed and reduce latency of my digital product?',
      topic_id: '12',
    },
    {
      id: '372',
      title:
        'How can I use image optimization to optimize the speed and reduce latency of my digital product?',
      topic_id: '12',
    },
    {
      id: '373',
      title:
        'How can I use browser optimization techniques to optimize the speed and reduce latency of my digital product?',
      topic_id: '12',
    },
    {
      id: '374',
      title:
        'How can I use browser rendering optimization to optimize the speed and reduce latency of my digital product?',
      topic_id: '12',
    },
    {
      id: '375',
      title:
        'How can I use browser font optimization to optimize the speed and reduce latency of my digital product?',
      topic_id: '12',
    },
    {
      id: '376',
      title:
        'How can I use browser network optimization to optimize the speed and reduce latency of my digital product?',
      topic_id: '12',
    },
    {
      id: '377',
      title:
        'How can I use browser data optimization to optimize the speed and reduce latency of my digital product?',
      topic_id: '12',
    },
    {
      id: '378',
      title:
        'How can I use browser optimization tools to optimize the speed and reduce latency of my digital product?',
      topic_id: '12',
    },
    {
      id: '379',
      title:
        'How can I use browser optimization software to optimize the speed and reduce latency of my digital product?',
      topic_id: '12',
    },
    {
      id: '380',
      title:
        'What are the most common mistakes made when creating a digital product?',
      topic_id: '13',
    },
    {
      id: '381',
      title:
        'How can I avoid these mistakes and ensure the success of my digital product?',
      topic_id: '13',
    },
    {
      id: '382',
      title:
        'How can I identify and solve user experience problems in my digital product?',
      topic_id: '13',
    },
    {
      id: '383',
      title: 'How can I address performance issues in my digital product?',
      topic_id: '13',
    },
    {
      id: '384',
      title:
        'How can I handle customer complaints and negative feedback for my digital product?',
      topic_id: '13',
    },
    {
      id: '385',
      title:
        'What are the most common security risks for digital products and how can I mitigate them?',
      topic_id: '13',
    },
    {
      id: '386',
      title: 'How can I handle scalability issues for my digital product?',
      topic_id: '13',
    },
    {
      id: '387',
      title:
        'How can I handle data privacy and compliance issues for my digital product?',
      topic_id: '13',
    },
    {
      id: '388',
      title:
        'How can I improve the accessibility of my digital product for users with disabilities?',
      topic_id: '13',
    },
    {
      id: '389',
      title: 'How can I improve the mobile-friendliness of my digital product?',
      topic_id: '13',
    },
    {
      id: '390',
      title:
        'How can I handle e-commerce and payment issues for my digital product?',
      topic_id: '13',
    },
    {
      id: '391',
      title:
        'How can I handle email and marketing automation issues for my digital product?',
      topic_id: '13',
    },
    {
      id: '392',
      title:
        'How can I improve user engagement and retention for my digital product?',
      topic_id: '13',
    },
    {
      id: '393',
      title:
        'How can I handle user onboarding and training issues for my digital product?',
      topic_id: '13',
    },
    {
      id: '394',
      title:
        'How can I handle pricing and monetization issues for my digital product?',
      topic_id: '13',
    },
    {
      id: '395',
      title: 'How can I handle data migration issues for my digital product?',
      topic_id: '13',
    },
    {
      id: '396',
      title:
        'How can I improve the user onboarding process for my digital product to ensure user retention?',
      topic_id: '13',
    },
    {
      id: '397',
      title:
        'What are the common mistakes when it comes to pricing a digital product and how can I avoid them?',
      topic_id: '13',
    },
    {
      id: '398',
      title:
        'How can I address and fix performance issues in my digital product to improve user experience?',
      topic_id: '13',
    },
    {
      id: '399',
      title:
        'What are the best practices for testing a digital product before launch and how can I implement them to ensure success?',
      topic_id: '13',
    },
  ]);
};
