require 'uri'
require 'net/http'

class Boggle
  NEIGHBORS_DATA = [
      [-1,-1, "↖"],
      [-1, 0, "↑"],
      [-1, 1, "↗"],
      [0, -1, "←"],
      [0,  1, "→"],
      [1, -1, "↙"],
      [1,  0, "↓"],
      [1,  1, "↘"],
  ]

  def initialize(args = {})
    @result = []
    @boggle = args[:boggle]
    @lengthc = @boggle[0].size
    @lengthr = @boggle.size
    puts("Given board") 
    puts @boggle.to_a.map(&:inspect)
    # Initialize trie datastructure
    @trie_node = {'valid'=> false, 'next'=> {}}
  end

  def check_word word
    @english_word = []
    @english_word << word

    trie_node = build_trie(@english_word, @trie_node)
    (0..@lengthr-1).each_with_index do |r, ri|
      (0..@lengthc-1).each_with_index do |c, ci|
        letter = @boggle[ri][ci]
        dfs(ri, ci, [], trie_node, '', "directions from #{letter} go")
      end  
    end
    return @result
  end

  def gen_trie(word, node)
    return unless word
    if !node.key?(word[0]) 
      node[word[0]] = {'valid' => word.length == 1, 'next' => {}}
    end
    return if word[1..-1] == ""
    gen_trie(word[1..-1], node[word[0]])
  end

  def build_trie(words, trie)
    # puts "Builds trie data structure from the list of words given"
    words.each do |word|
      gen_trie(word, trie)
    end
    return trie
  end

  def get_neighbors(r, c)
    # puts "Returns the neighbors for a given co-ordinates"
    n = []
    NEIGHBORS_DATA.each do |neigh|
      new_r = r + neigh[0]
      new_c = c + neigh[1]

      next if (new_r >= @lengthr) || (new_c >= @lengthc) || (new_r < 0) || (new_c < 0)
      n.append [new_r, new_c, neigh[2]]
    end
    return n
  end

  def dfs(r, c, visited, trie, now_word, direction)
    # "Scan the graph using DFS"
    if visited.include?([r, c])
      return
    end
    letter = @boggle[r][c]
    visited.append [r, c]
    if trie.key?(letter)
      now_word += letter
      if trie[letter]['valid']
        puts "Found #{now_word} #{direction}"
        @result << "Found #{now_word} #{direction}"
      end
      neighbors = get_neighbors(r, c)
      neighbors.each do |n|
        dfs(n[0], n[1], visited[0..], trie[letter], now_word, direction + " " + n[2])
      end
    end
  end
end
