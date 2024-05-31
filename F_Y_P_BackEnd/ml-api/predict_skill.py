import sys
import joblib
import pandas as pd

model = joblib.load('model.pkl')
vectorizer = joblib.load('vectorizer.pkl')
industry_name = sys.argv[1]

industry_vec = vectorizer.transform([industry_name])
skills = model.predict(industry_vec)
skills_df = pd.DataFrame(skills, columns=vectorizer.get_feature_names_out())

predicted_skills = skills_df.columns[skills[0] == 1].tolist()
print(predicted_skills)
