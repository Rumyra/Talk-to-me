require 'sinatra'
require 'speechcloud'
require 'json'

def load_speechcloud
  conf = SpeechCloud::Config
  conf.api_key  = ENV['IVONA_API_KEY']
  conf.email    = ENV['IVONA_EMAIL']
  conf.codec_id = 'mp3/22050'
  conf.voice_id = 'en_gb_emma'
end

get '/' do
  erb :index
end

# Get a JSON array of all possible voices. Edit the voice_id above to hear
# a different voice.
get '/voices' do
  load_speechcloud
  SpeechCloud::AdditionalInfo.list_voices.to_json
end

post '/get-speech' do
  load_speechcloud
  text = params['text']
  speech = SpeechCloud::Speech.create_speech_file(text)
  puts speech
  speech['soundUrl']
end
