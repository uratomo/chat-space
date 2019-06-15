require 'rails_helper'

feature 'tweet', type: :feature do
# このブロックの内部にscenarioを記述していく
  let(:user){create(:user)}
  
  scenario "post tweet" do
  visit  root_path
  expect(page).to have_no_conttent("投稿する")

  visit new_user_session_path
  fill_in "user_email",with:  user.email
  fill_in "user_password",with:user.password
  find('input[name= "commit"]').click
  expect(current_path).to eq root_path
  expect(page).to have_content("投稿する")

  expect{
    click_link('投稿する')
    expect(currentt_path).to eq new_tweet_path
    fill_in "image",with: 'https://s.eximg.jp/expub/feed/Papimami/2016/Papimami_83279/Papimami_83279_1.png'
    fill_in "text",with:"フィーチャスペックのテスト"
    find('input[type="submit"]').click
  }.to change(Tweet, :count).by(1)

  end

end

