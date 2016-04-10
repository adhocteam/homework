require 'rails_helper'

describe 'Home page' do
  it "should welcome the user" do
    visit root_path
    expect(page).to have_content "Welcome!"
  end
end