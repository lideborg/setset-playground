// Script to analyze all 24 models and save descriptions
require('dotenv').config();
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const models = [
  { name: "James Wilson", image: path.join(__dirname, "../images/talent-01_JamesWilson.png"), id: "james" },
  { name: "Maya Johnson", image: path.join(__dirname, "../images/talent-02_MayaJohnson.png"), id: "maya" },
  { name: "River Blake", image: path.join(__dirname, "../images/talent-03_RiverBlake.png"), id: "river" },
  { name: "Emma Sullivan", image: path.join(__dirname, "../images/talent-04_EmmaSullivan.png"), id: "emma" },
  { name: "Marcus Brown", image: path.join(__dirname, "../images/talent-05_MarcusBrown.png"), id: "marcus" },
  { name: "Zara Mitchell", image: path.join(__dirname, "../images/talent-06_ZaraMitchell.png"), id: "zara" },
  { name: "Sophia Anderson", image: path.join(__dirname, "../images/talent-07_SophiaAnderson.png"), id: "sophia" },
  { name: "Liam Garcia", image: path.join(__dirname, "../images/talent-08_LiamGarcia.png"), id: "liam" },
  { name: "Nina Davis", image: path.join(__dirname, "../images/talent-09_NinaDavis.png"), id: "nina" },
  { name: "Ava Martinez", image: path.join(__dirname, "../images/talent-10_AvaMartinez.png"), id: "ava" },
  { name: "Luna Park", image: path.join(__dirname, "../images/talent-11_LunaPark.png"), id: "luna" },
  { name: "Noah Chen", image: path.join(__dirname, "../images/talent-12_NoahChen.png"), id: "noah" },
  { name: "Kai Thompson", image: path.join(__dirname, "../images/talent-13_KaiThompson.png"), id: "kai" },
  { name: "Riley Morgan", image: path.join(__dirname, "../images/talent-14_RileyMorgan.png"), id: "riley" },
  { name: "Jordan Lee", image: path.join(__dirname, "../images/talent-15_JordanLee.png"), id: "jordan" },
  { name: "Isabella Rodriguez", image: path.join(__dirname, "../images/talent-16_IsabellaRodriguez.png"), id: "isabella" },
  { name: "Quinn Santos", image: path.join(__dirname, "../images/talent-17_QuinnSantos.png"), id: "quinn" },
  { name: "Casey White", image: path.join(__dirname, "../images/talent-18_CaseyWhite.png"), id: "casey" },
  { name: "Sam Wilson", image: path.join(__dirname, "../images/talent-19_SamWilson.png"), id: "sam" },
  { name: "Drew Martinez", image: path.join(__dirname, "../images/talent-20_DrewMartinez.png"), id: "drew" },
  { name: "Avery Taylor", image: path.join(__dirname, "../images/talent-21_AveryTaylor.png"), id: "avery" },
  { name: "Parker Miller", image: path.join(__dirname, "../images/talent-22_ParkerMiller.png"), id: "parker" },
  { name: "Morgan Kim", image: path.join(__dirname, "../images/talent-23_MorganKim.png"), id: "morgan" },
  { name: "Andre Jackson", image: path.join(__dirname, "../images/talent-24_AndreJackson.png"), id: "andre" },
  { name: "Damon Carter", image: path.join(__dirname, "../images/talent-25_DamonCarter.png"), id: "damon" },
  { name: "Nikolai Volkov", image: path.join(__dirname, "../images/talent-26_NikolaiVolkov.png"), id: "nikolai" },
  { name: "Sofia Rodriguez", image: path.join(__dirname, "../images/talent-27_SofiaRodriguez.png"), id: "sofia" },
  { name: "Finn O'Connor", image: path.join(__dirname, "../images/talent-28_FinnOConnor.png"), id: "finn" },
  { name: "Clara Devereaux", image: path.join(__dirname, "../images/talent-29_ClaraDevereaux.png"), id: "clara" },
  { name: "Simone Park", image: path.join(__dirname, "../images/talent-30_ZoeWashington.png"), id: "zoe" }
];

async function analyzeModel(model) {
  console.log(`Analyzing ${model.name}...`);

  // Read image and convert to base64
  const imageBuffer = fs.readFileSync(model.image);
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  const analysisPrompt = `Analyze this person's appearance for use in AI image generation prompts. Describe them concisely for reference purposes.

Return ONLY a JSON object with these fields:
{
  "gender": "male/female/non-binary",
  "age_range": "early 20s/mid 20s/late 20s/30s/40s/50s",
  "ethnicity": "brief ethnicity description",
  "hair_color": "hair color",
  "hair_style": "hair style description",
  "skin_tone": "skin tone description",
  "distinctive_features": "any notable features",
  "overall_description": "One concise sentence describing this exact person for AI generation"
}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: analysisPrompt },
            { type: 'image_url', image_url: { url: base64Image } }
          ]
        }
      ],
      max_tokens: 300
    });

    let analysisText = response.choices[0].message.content.trim();

    // Strip markdown if present
    if (analysisText.startsWith('```json')) {
      analysisText = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (analysisText.startsWith('```')) {
      analysisText = analysisText.replace(/```\n?/g, '');
    }

    const analysis = JSON.parse(analysisText.trim());

    return {
      id: model.id,
      name: model.name,
      ...analysis
    };
  } catch (error) {
    console.error(`Error analyzing ${model.name}:`, error);
    return null;
  }
}

async function analyzeAllModels() {
  console.log('Starting model analysis...\n');

  const results = [];

  for (const model of models) {
    const analysis = await analyzeModel(model);
    if (analysis) {
      results.push(analysis);
      console.log(`✓ ${model.name} analyzed`);
    }
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Save to JSON file
  const outputPath = path.join(__dirname, 'model-descriptions.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

  console.log(`\n✅ Analysis complete! Saved to ${outputPath}`);
  console.log(`Analyzed ${results.length} models`);
}

analyzeAllModels().catch(console.error);
