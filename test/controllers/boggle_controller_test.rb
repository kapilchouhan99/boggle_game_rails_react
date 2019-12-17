require 'test_helper'

class BoggleControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get boggle_index_url
    assert_response :success
  end

end
