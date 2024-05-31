import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.multioutput import MultiOutputClassifier
from sklearn.ensemble import RandomForestClassifier
import joblib

file_path = r'C:\Users\alwah\OneDrive\Desktop\Final12\F_Y_P_BackEnd\ml-api\hi.csv'  # Assuming this is a CSV file path, which seems unusual. Ensure this is correct.
df = pd.read_csv(file_path)

# Combine all related skills columns into a single list for each row
df['skills'] = df[df.columns[1:]].apply(lambda x: ','.join(x.dropna().astype(str)), axis=1)

# Prepare the data for training
X = df['name']
y = df['skills'].str.get_dummies(sep=',')

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Vectorize the industry/field names
vectorizer = CountVectorizer()

# Transform the data
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# Create and train the model using RandomForestClassifier
random_forest = RandomForestClassifier(n_estimators=100, random_state=42)
model = MultiOutputClassifier(random_forest)
model.fit(X_train_vec, y_train)

# Save the trained model and vectorizer
joblib.dump(model, 'model.pkl')
joblib.dump(vectorizer, 'vectorizer.pkl')

print('Model trained and saved successfully')
