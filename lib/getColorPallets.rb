require 'nokogiri'
require 'open-uri'
require 'pp'

doc = Nokogiri::XML(open('http://www.colourlovers.com/api/palettes/top'))

palettes = {}

doc.css('palette').each do |p|
  name = p.css("title").first.content
  palettes[name] = []
  p.children.each do |n|
    n.css('hex').each do |h|
      palettes[name].push(h.content)
    end
  end
end

File.open("app/assets/javascripts/color_palettes.js", "w") do |f|
  f << "var colorPalettes = " <<  palettes.to_json << ";"
end