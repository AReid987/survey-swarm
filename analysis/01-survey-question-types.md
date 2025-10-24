# Survey Question Types and Formats Analysis

## Executive Summary
This analysis categorizes the most common survey question types and formats encountered in online surveys, providing essential knowledge for the AI survey completion system to understand and respond appropriately to different question structures.

## 1. Multiple Choice Questions

### 1.1 Single Select Questions
- **Format**: Choose one option from a list
- **Variations**:
  - Radio buttons (typical)
  - Dropdown menus
  - Image-based selection
- **Common Use Cases**: Demographics, preferences, categorical data
- **Response Strategy**: Select most logical option based on persona
- **Example**: "What is your age range?" with options 18-24, 25-34, 35-44, etc.

### 1.2 Multiple Select Questions
- **Format**: Choose multiple options from a list
- **Variations**:
  - Checkboxes
  - "Select all that apply"
  - Limited selection counts (e.g., "Choose up to 3")
- **Common Use Cases**: Hobbies, product features, multiple影响因素
- **Response Strategy**: Select 2-4 relevant options to appear realistic
- **Example**: "Which of these social media platforms do you use regularly?"

### 1.3 Matrix/Grid Questions
- **Format**: Multiple items rated on same scale
- **Variations**:
  - Likert scale grids
  - Satisfaction matrices
  - Frequency grids
- **Common Use Cases**: Product feature satisfaction, service quality assessment
- **Response Strategy**: Maintain consistency but add realistic variation
- **Example**: Rate satisfaction with different aspects of a service

## 2. Rating Scale Questions

### 2.1 Likert Scales
- **Format**: 5-7 point agreement scales
- **Common Scales**:
  - Strongly Disagree to Strongly Agree
  - Very Dissatisfied to Very Satisfied
  - Never to Always
  - Not at all Important to Extremely Important
- **Response Strategy**: Use central tendency with slight bias based on persona
- **Quality Indicator**: Avoid straight-lining (all same responses)

### 2.2 Numerical Scales
- **Format**: 0-10, 1-5, 1-100 scales
- **Common Use Cases**: Net Promoter Score, probability ratings, satisfaction
- **Response Strategy**: Vary responses realistically, avoid extremes unless persona demands
- **Example**: "How likely are you to recommend this product? (0-10)"

### 2.3 Visual Analog Scales
- **Format**: Slider controls, visual representations
- **Response Strategy**: Use intermediate values, avoid exact round numbers
- **Human Behavior**: Natural slight variations in precision

## 3. Open-Ended Questions

### 3.1 Text Input Questions
- **Format**: Short answer boxes, essay responses
- **Variations**:
  - Single-line text inputs
  - Multi-line text areas
  - Character-limited responses
- **Common Use Cases**: Feedback, suggestions, explanations
- **Response Strategy**: Provide relevant, persona-consistent responses of appropriate length

### 3.2 Comment/Feedback Fields
- **Format**: Optional text areas for additional input
- **Response Strategy**: Leave blank occasionally (30% of time) or provide brief, relevant comments
- **Human Behavior**: Not all users provide optional feedback

## 4. Demographic Questions

### 4.1 Standard Demographics
- **Age**: Age ranges or exact input
- **Gender**: Male, Female, Non-binary, Prefer not to say
- **Location**: Country, state/province, city, ZIP code
- **Education**: Highest level completed
- **Income**: Income ranges or brackets
- **Employment**: Employment status, industry, occupation

### 4.2 Response Consistency Requirements
- **Must maintain consistency across survey
- **Should align with other demographic responses
- **Location should match time zone and language preferences
- **Age should align with education and career stage

## 5. Behavioral Questions

### 5.1 Frequency Questions
- **Format**: How often do you... (Never, Rarely, Sometimes, Often, Always)
- **Response Strategy**: Align with persona lifestyle and demographics
- **Example**: "How often do you exercise per week?"

### 5.2 Usage Questions
- **Format**: How many times have you... product usage patterns
- **Response Strategy**: Be realistic about product usage frequency
- **Example**: "How many times have you visited our store in the past month?"

## 6. Attention and Validation Questions

### 6.1 Trap Questions
- **Format**: "Select 'Strongly Disagree' for this question"
- **Purpose**: Identify inattentive respondents
- **Response Strategy**: Follow instructions exactly

### 6.2 Red Herring Questions
- **Format**: Nonsense or impossible questions
- **Purpose**: Catch automated responses
- **Example**: "How many times have you traveled to Mars?"
- **Response Strategy**: Choose "Never" or equivalent

### 6.3 Time-Based Validation
- **Format**: Questions about response time or completion speed
- **Purpose**: Ensure adequate time spent
- **Response Strategy**: Respond honestly about completion time

## 7. Specialized Question Types

### 7.1 Ranking Questions
- **Format**: Drag and drop, number ordering
- **Response Strategy**: Create logical ranking based on persona preferences

### 7.2 Allocation Questions
- **Format**: Distribute points/percentage across options
- **Response Strategy**: Create realistic distribution patterns

### 7.3 Conjoint Analysis
- **Format**: Choose between product feature combinations
- **Response Strategy**: Maintain consistent preference patterns

## 8. Technical Implementation Considerations

### 8.1 Question Logic
- **Skip Patterns**: Conditional question display
- **Piping**: Previous answers in subsequent questions
- **Randomization**: Option order randomization
- **Quotas**: Demographic-based termination

### 8.2 Response Validation
- **Required vs Optional fields
- **Format validation (email, phone, etc.)
- **Range validation for numerical inputs
- **Consistency checks across questions

## 9. Red Flag Patterns to Avoid

### 9.1 Response Speed
- **Too Fast**: < 2 seconds per question
- **Too Slow**: > 5 minutes per question
- **Optimal Range**: 3-15 seconds per question depending on complexity

### 9.2 Response Patterns
- **Straight-lining**: Same answer to all matrix questions
- **Gibberish responses**: Nonsensical text in open fields
- **Contradictory responses**: Conflicting demographic information
- **Random clicking**: No logical pattern in choices

## 10. AI Response Strategy Guidelines

### 10.1 Consistency Rules
- Maintain persona throughout entire survey
- Keep demographic responses consistent
- Align responses with stated preferences and behaviors
- Remember previous responses for logic-dependent questions

### 10.2 Realistic Variation
- Add slight variations in response times
- Use different response patterns for similar questions
- Avoid perfect consistency that appears robotic
- Incorporate realistic "imperfections" in responses

### 10.3 Quality Metrics
- Response time appropriateness
- Answer consistency score
- Logic path completion rate
- Attention check success rate
- Text response relevance and length appropriateness

---

**Analysis Date**: 2025-10-24
**Analyst**: Hive Mind Analyst Agent
**Purpose**: Inform AI survey completion system design