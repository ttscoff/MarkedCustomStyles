#!/usr/bin/env ruby
require 'cgi'
require 'uri'

cgi = CGI.new
p = cgi.params

print cgi.header( 'type' => 'application/json','expires' => Time.now - (180) )

def die_error(msg, error)
  err = error.strip.gsub(/\n+/,' | ').gsub(/(?:\/[^\/]+)+\/([^\/]+\.\w+)/,'\1')
  print %Q{{"success": false, "error": "#{msg}", "message": "#{err}"}}
  Process.exit
end

if ARGV.length == 0
  url = p['style'][0].to_s || false
  title = p['name'][0].to_s || false
else
  title = CGI.unescape(ARGV[0].to_s) || false
  url = CGI.unescape(ARGV[1].to_s) || false
end

begin
  css = IO.read(File.expand_path(url)).force_encoding('utf-8');
  encoded = URI.encode(css.strip).gsub(/=/,'%3D').gsub(/&/,'%26')
  print %Q{{"success": true, "url": "x-marked://addstyle?name=#{URI.encode(title)}&css=#{encoded}" }}
rescue Exception => e
  die_error("Failed to read style", e.message)
end
