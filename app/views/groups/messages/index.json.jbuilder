json.messages @messages do |message|
  json.name   message.user.name
  json.time   message.created_at.to_s(:default)
  json.body   message.body
  json.image  message.image.url
end

