/**
 * Survey fixtures for testing
 * Provides mock survey structures and data
 */

export const surveyFixtures = {
  // Basic form survey fixture
  basicFormSurvey: {
    id: 'basic-survey-001',
    title: 'Customer Satisfaction Survey',
    description: 'Help us improve our service',
    url: 'http://localhost:3000/mock-surveys/basic',
    type: 'form',
    estimatedTime: '3-5 minutes',
    fields: [
      {
        id: 'name',
        type: 'text',
        label: 'Full Name',
        required: true,
        selector: 'input[name="name"]'
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email Address',
        required: true,
        selector: 'input[name="email"]'
      },
      {
        id: 'age',
        type: 'number',
        label: 'Age',
        required: true,
        selector: 'input[name="age"]',
        validation: { min: 18, max: 100 }
      },
      {
        id: 'gender',
        type: 'radio',
        label: 'Gender',
        required: true,
        selector: 'input[name="gender"]',
        options: ['male', 'female', 'non-binary', 'prefer-not-to-say']
      },
      {
        id: 'satisfaction',
        type: 'rating',
        label: 'Overall Satisfaction',
        required: true,
        selector: '.rating-scale input',
        scale: { min: 1, max: 5 }
      },
      {
        id: 'comments',
        type: 'textarea',
        label: 'Additional Comments',
        required: false,
        selector: 'textarea[name="comments"]'
      }
    ],
    submitButton: {
      selector: 'button[type="submit"]',
      text: 'Submit Survey'
    }
  },

  // Multi-page survey fixture
  multiPageSurvey: {
    id: 'multi-page-survey-001',
    title: 'Comprehensive User Experience Survey',
    description: 'Detailed survey about user experience',
    url: 'http://localhost:3000/mock-surveys/multi-page',
    type: 'multi-page',
    estimatedTime: '8-12 minutes',
    pages: [
      {
        id: 'page1',
        title: 'Demographics',
        fields: [
          {
            id: 'country',
            type: 'select',
            label: 'Country',
            required: true,
            selector: 'select[name="country"]',
            options: ['US', 'CA', 'UK', 'AU', 'DE', 'FR', 'JP', 'Other']
          },
          {
            id: 'education',
            type: 'select',
            label: 'Education Level',
            required: true,
            selector: 'select[name="education"]',
            options: ['High School', 'Some College', 'Bachelor', 'Master', 'PhD']
          },
          {
            id: 'income',
            type: 'radio',
            label: 'Annual Income',
            required: false,
            selector: 'input[name="income"]',
            options: ['<25k', '25-50k', '50-75k', '75-100k', '>100k']
          }
        ],
        nextButton: { selector: 'button[name="next"]', text: 'Next' }
      },
      {
        id: 'page2',
        title: 'Usage Patterns',
        fields: [
          {
            id: 'usage-frequency',
            type: 'radio',
            label: 'How often do you use our product?',
            required: true,
            selector: 'input[name="usage-frequency"]',
            options: ['Daily', 'Weekly', 'Monthly', 'Rarely', 'Never']
          },
          {
            id: 'features',
            type: 'checkbox',
            label: 'Which features do you use?',
            required: true,
            selector: 'input[name="features"]',
            options: ['Feature A', 'Feature B', 'Feature C', 'Feature D']
          },
          {
            id: 'recommendation',
            type: 'rating',
            label: 'How likely are you to recommend us?',
            required: true,
            selector: '.nps-scale input',
            scale: { min: 0, max: 10 }
          }
        ],
        nextButton: { selector: 'button[name="next"]', text: 'Next' },
        previousButton: { selector: 'button[name="previous"]', text: 'Previous' }
      },
      {
        id: 'page3',
        title: 'Feedback',
        fields: [
          {
            id: 'improvements',
            type: 'textarea',
            label: 'What would you like to see improved?',
            required: false,
            selector: 'textarea[name="improvements"]'
          },
          {
            id: 'additional-comments',
            type: 'textarea',
            label: 'Any additional feedback?',
            required: false,
            selector: 'textarea[name="additional-comments"]'
          }
        ],
        submitButton: { selector: 'button[type="submit"]', text: 'Submit' },
        previousButton: { selector: 'button[name="previous"]', text: 'Previous' }
      }
    ]
  },

  // Interactive survey fixture
  interactiveSurvey: {
    id: 'interactive-survey-001',
    title: 'Product Preference Survey',
    description: 'Interactive survey to understand your preferences',
    url: 'http://localhost:3000/mock-surveys/interactive',
    type: 'interactive',
    estimatedTime: '10-15 minutes',
    interactions: [
      {
        id: 'image-selection',
        type: 'image-choice',
        label: 'Select your favorite design',
        required: true,
        selector: '.image-choice-container img',
        options: [
          { id: 'design1', src: '/images/design1.jpg', alt: 'Design 1' },
          { id: 'design2', src: '/images/design2.jpg', alt: 'Design 2' },
          { id: 'design3', src: '/images/design3.jpg', alt: 'Design 3' }
        ]
      },
      {
        id: 'drag-drop',
        type: 'ranking',
        label: 'Rank these features by importance',
        required: true,
        selector: '.ranking-container .draggable-item',
        items: ['Feature A', 'Feature B', 'Feature C', 'Feature D'],
        dropZone: '.ranking-drop-zone'
      },
      {
        id: 'slider-scale',
        type: 'slider',
        label: 'Rate your satisfaction level',
        required: true,
        selector: '.slider-input',
        scale: { min: 0, max: 100, step: 1 }
      }
    ],
    submitButton: { selector: 'button[type="submit"]', text: 'Complete Survey' }
  },

  // Survey with validation rules
  validationSurvey: {
    id: 'validation-survey-001',
    title: 'Survey with Validation',
    description: 'Survey with various validation rules',
    url: 'http://localhost:3000/mock-surveys/validation',
    type: 'form',
    estimatedTime: '5 minutes',
    fields: [
      {
        id: 'phone',
        type: 'tel',
        label: 'Phone Number',
        required: true,
        selector: 'input[name="phone"]',
        validation: {
          pattern: '^\\+?[1-9]\\d{1,14}$',
          message: 'Please enter a valid phone number'
        }
      },
      {
        id: 'zip-code',
        type: 'text',
        label: 'ZIP Code',
        required: true,
        selector: 'input[name="zip-code"]',
        validation: {
          pattern: '^\\d{5}(-\\d{4})?$',
          message: 'Please enter a valid ZIP code'
        }
      },
      {
        id: 'website',
        type: 'url',
        label: 'Website',
        required: false,
        selector: 'input[name="website"]',
        validation: {
          pattern: '^https?://.+',
          message: 'Please enter a valid URL'
        }
      },
      {
        id: 'agreement',
        type: 'checkbox',
        label: 'I agree to the terms and conditions',
        required: true,
        selector: 'input[name="agreement"]',
        validation: {
          required: true,
          message: 'You must agree to the terms to continue'
        }
      }
    ],
    submitButton: { selector: 'button[type="submit"]', text: 'Submit' }
  },

  // Timed survey fixture
  timedSurvey: {
    id: 'timed-survey-001',
    title: 'Timed Response Survey',
    description: 'Survey with time limits for responses',
    url: 'http://localhost:3000/mock-surveys/timed',
    type: 'timed',
    estimatedTime: '5 minutes',
    timeLimit: 300, // 5 minutes in seconds
    sections: [
      {
        id: 'section1',
        title: 'Quick Questions',
        timeLimit: 60, // 1 minute
        fields: [
          {
            id: 'q1',
            type: 'radio',
            label: 'Question 1',
            required: true,
            selector: 'input[name="q1"]',
            options: ['Yes', 'No', 'Maybe']
          },
          {
            id: 'q2',
            type: 'radio',
            label: 'Question 2',
            required: true,
            selector: 'input[name="q2"]',
            options: ['Option A', 'Option B', 'Option C']
          }
        ]
      },
      {
        id: 'section2',
        title: 'Detailed Response',
        timeLimit: 180, // 3 minutes
        fields: [
          {
            id: 'detailed-response',
            type: 'textarea',
            label: 'Please provide detailed feedback',
            required: true,
            selector: 'textarea[name="detailed-response"]',
            minLength: 50,
            maxLength: 500
          }
        ]
      }
    ],
    submitButton: { selector: 'button[type="submit"]', text: 'Submit' }
  }
};

// Survey responses for testing
export const surveyResponses = {
  validResponses: {
    basicFormSurvey: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30,
      gender: 'male',
      satisfaction: 4,
      comments: 'Great service overall!'
    },
    multiPageSurvey: {
      page1: {
        country: 'US',
        education: 'Bachelor',
        income: '50-75k'
      },
      page2: {
        'usage-frequency': 'Weekly',
        features: ['Feature A', 'Feature C'],
        recommendation: 8
      },
      page3: {
        improvements: 'Better documentation would be helpful',
        'additional-comments': 'Overall satisfied with the product'
      }
    },
    interactiveSurvey: {
      'image-selection': 'design2',
      'drag-drop': ['Feature A', 'Feature C', 'Feature B', 'Feature D'],
      'slider-scale': 75
    }
  },

  invalidResponses: {
    missingRequired: {
      name: 'John Doe',
      // Missing email, age, gender
      satisfaction: 4
    },
    invalidFormat: {
      name: 'John Doe',
      email: 'invalid-email',
      age: 150, // Too old
      gender: 'invalid-gender',
      satisfaction: 6 // Out of range
    },
    emptyFields: {
      name: '',
      email: '',
      age: null,
      gender: null,
      satisfaction: null,
      comments: ''
    }
  }
};

// Platform-specific survey configurations
export const platformConfigs = {
  surveyMonkey: {
    selectors: {
      title: '.survey-title',
      description: '.survey-description',
      question: '.question-text',
      radioInput: 'input[type="radio"]',
      checkboxInput: 'input[type="checkbox"]',
      textInput: 'input[type="text"]',
      textArea: 'textarea',
      select: 'select',
      submitButton: '.sm-submit-button'
    },
    waitStrategy: {
      waitForSelector: '.question-container',
      waitForNavigation: false,
      timeout: 10000
    }
  },

  googleForms: {
    selectors: {
      title: '.freebirdFormTitle',
      description: '.freebirdFormDescription',
      question: '.freebirdCustomfont',
      radioInput: '[role="radio"]',
      checkboxInput: '[role="checkbox"]',
      textInput: '.quantumWizTextinputPaperinputInput',
      textArea: '.quantumWizTextinputPapertextareaInput',
      select: '.exportSelectDropdown',
      submitButton: '.quantumWizButtonPaperbuttonContent'
    },
    waitStrategy: {
      waitForSelector: '.freebirdFormView',
      waitForNavigation: false,
      timeout: 8000
    }
  },

  qualtrics: {
    selectors: {
      title: '.QuestionText',
      description: '.SurveyDescription',
      question: '.QuestionText',
      radioInput: '.radio-label',
      checkboxInput: '.checkbox-label',
      textInput: '.text-input',
      textArea: '.text-area',
      select: '.select-dropdown',
      submitButton: '.next-button'
    },
    waitStrategy: {
      waitForSelector: '.skin',
      waitForNavigation: true,
      timeout: 12000
    }
  }
};

export default {
  surveyFixtures,
  surveyResponses,
  platformConfigs
};