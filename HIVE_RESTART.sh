#!/bin/bash

# 🧠 HIVE MIND RESTART SCRIPT
# Survey Swarm Multi-Agent System

echo "🐝 Reactivating Survey Swarm Hive Mind..."
echo "📅 Restart Date: $(date)"
echo "📍 Location: $(pwd)"
echo ""

# Check if we're in the right directory
if [ ! -f "SESSION_STATE.md" ]; then
    echo "❌ Error: SESSION_STATE.md not found!"
    echo "Please navigate to the survey-swarm directory first."
    exit 1
fi

echo "✅ Session state found"
echo ""

# Display current status
echo "📊 Current Hive Mind Status:"
echo "============================"
cat SESSION_STATE.md | grep -A 20 "📋 TODO LIST STATE"
echo ""

echo "🎯 Current Objective:"
echo "===================="
cat SESSION_STATE.md | grep -A 5 "🎯 CURRENT OBJECTIVE"
echo ""

echo "🔧 Restart Instructions:"
echo "======================"
echo "1. Review the SESSION_STATE.md file for full context"
echo "2. Check the TODO list for pending tasks"
echo "3. Review architecture requirements in ARCHITECTURE.md"
echo "4. Examine progress in HIVE_PROGRESS.md"
echo "5. Deploy the 6 specialized agents when ready"
echo ""

echo "🚀 Ready to Resume Hive Mind Operations!"
echo "💾 All progress and context has been preserved"
echo ""

# Optional: Git status check
if command -v git &> /dev/null; then
    echo "📁 Git Status:"
    git status --porcelain
fi

echo ""
echo "🧠 Hive Mind Collective Intelligence - Awaiting Reactivation"