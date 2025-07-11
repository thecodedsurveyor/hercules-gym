# 🤖 AI Integration Setup Guide

## Overview

Hercules Gym now includes **real AI-powered personalized nutrition and workout recommendations** using the **Mixtral 8x7B** model via OpenRouter. This guide will help you set up the AI features.

## ✨ Features

- **AI-Generated Workouts**: Personalized exercise routines based on your fitness goals, level, and preferences
- **AI-Generated Nutrition**: Custom meal plans tailored to your dietary needs and fitness objectives
- **AI-Powered Motivation**: Daily motivational quotes specific to your fitness journey
- **Intelligent Fallbacks**: System gracefully falls back to smart recommendations if AI is unavailable

## 🚀 Quick Setup

### 1. Get Your OpenRouter API Key

1. Visit [OpenRouter.ai](https://openrouter.ai)
2. Sign up for a free account
3. Go to your [API Keys page](https://openrouter.ai/keys)
4. Create a new API key
5. Copy your API key (starts with `sk-or-v1-...`)

### 2. Configure Backend

1. Navigate to the `backend` folder:

    ```bash
    cd backend
    ```

2. Create or edit your `.env` file:

    ```bash
    # On Windows
    echo OPENROUTER_API_KEY=your_actual_api_key_here > .env

    # On Mac/Linux
    echo "OPENROUTER_API_KEY=your_actual_api_key_here" > .env
    ```

3. Replace `your_actual_api_key_here` with your real OpenRouter API key

### 3. Test the Integration

Run the test script to verify everything is working:

```bash
npm run test:ai
```

You should see output like:

```
🤖 Testing AI Integration...
✅ OpenRouter API key configured
✅ Real AI content will be generated
```

## 🔧 Technical Implementation

### Backend Architecture

- **AIService** (`src/services/ai.service.ts`): Core AI integration service
- **Mixtral Model**: Uses `mistralai/mixtral-8x7b-instruct` for content generation
- **Smart Fallbacks**: Intelligent backup content if AI fails
- **User Profiling**: Incorporates user fitness data for personalization

### Frontend Integration

- **React Query**: Efficient data fetching and caching for AI content
- **Real-time Updates**: Dashboard displays live AI-generated recommendations
- **Error Handling**: Graceful degradation with user-friendly error messages
- **Performance**: Optimized with appropriate caching strategies

### API Endpoints

- `GET /dashboard/ai-content/:userId` - Get personalized AI content
- Auto-integrated with existing dashboard data flows

## 💰 Cost Information

OpenRouter pricing for Mixtral 8x7B:

- **Input**: ~$0.24 per 1M tokens
- **Output**: ~$0.24 per 1M tokens
- **Typical Cost**: $0.01-0.05 per user per day (depending on usage)

### Cost Optimization Tips

1. **Smart Caching**: AI content is cached for 10 minutes by default
2. **Fallback System**: Reduces API calls when unnecessary
3. **Efficient Prompts**: Optimized prompts minimize token usage
4. **Request Limiting**: Built-in rate limiting prevents excess API calls

## 🛡️ Security & Privacy

- **API Key Security**: Environment variables keep keys secure
- **No Data Storage**: User data is not stored by OpenRouter
- **Request Validation**: All inputs are sanitized before API calls
- **Error Handling**: Sensitive information is never exposed in errors

## 🔍 Monitoring & Debugging

### Check AI Status

```bash
# Test the AI integration
npm run test:ai

# Check logs for AI-related errors
npm run start:dev | grep "AI"
```

### Common Issues

**Problem**: "AI Content Unavailable" message
**Solution**:

1. Check your API key is correctly set in `.env`
2. Verify your OpenRouter account has credits
3. Check network connectivity

**Problem**: Slow AI responses
**Solution**:

1. Check OpenRouter status page
2. Consider upgrading OpenRouter plan for faster responses
3. Verify caching is working (should only call AI every 10 minutes)

## 🎯 Customization

### Adjust AI Prompts

Edit `src/services/ai.service.ts` to customize:

- Workout generation prompts
- Nutrition recommendation logic
- Motivational quote styles

### Modify Caching

Update React Query settings in `hooks/use-dashboard-data.ts`:

```typescript
staleTime: 1000 * 60 * 10, // 10 minutes (adjust as needed)
```

### Change AI Model

In `ai.service.ts`, update the model:

```typescript
model: 'mistralai/mixtral-8x7b-instruct', // Change to different model
```

## 🚀 Going Live

### Production Checklist

- [ ] Set `OPENROUTER_API_KEY` in production environment
- [ ] Configure environment variable in your hosting platform
- [ ] Test AI integration in production environment
- [ ] Monitor API usage and costs
- [ ] Set up alerts for API failures

### Environment Variables

```bash
# Production .env
OPENROUTER_API_KEY=sk-or-v1-your-production-key-here
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
NODE_ENV=production
```

## 📊 Analytics & Insights

The AI system automatically tracks:

- Content generation success/failure rates
- Fallback usage statistics
- User engagement with AI recommendations
- Performance metrics and response times

## 🆘 Support

If you encounter issues:

1. **Check the logs**: Look for AI-related error messages
2. **Test connectivity**: Verify OpenRouter API is accessible
3. **Validate setup**: Run the test script to confirm configuration
4. **Review documentation**: Check OpenRouter docs for API changes

## 🎉 Success!

Once configured, users will see:

- ✅ Personalized workout recommendations powered by AI
- ✅ Custom nutrition plans based on their profile
- ✅ Daily motivational quotes tailored to their goals
- ✅ Beautiful, professional UI displaying AI content

Your Hercules Gym app now has **real AI-powered fitness coaching**! 🚀
